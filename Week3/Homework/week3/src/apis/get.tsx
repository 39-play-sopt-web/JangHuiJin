import apiClient from "./apiClient";
import { ratingParams, type RatingFilter } from "../constants/ratingFilters";
import { backdropUrl, posterUrl } from "../utils/format";

export interface Movie {
    id: number
    title: string
    poster_path: string | null
    posterUrl: string | null
    vote_average: number
    release_date: string
    overview: string
}

type MovieResponse = Omit<Movie, 'posterUrl'>

export interface MovieListResponse {
    results: MovieResponse[]
    total_pages: number
}

export interface MovieDetail extends Movie {
    backdrop_path: string | null
    backdropUrl: string | null
    runtime: number | null
    genres: { id: number; name: string }[]
    original_title: string
    original_language: string
    status: string
    vote_count: number
    budget: number
    revenue: number
    production_countries: { name: string }[]
    spoken_languages: { english_name: string }[]
}

type MovieDetailResponse = Omit<MovieDetail, 'posterUrl' | 'backdropUrl'>

function withPoster(movie: MovieResponse): Movie {
    return {
        ...movie,
        posterUrl: posterUrl(movie.poster_path),
    }
}

export async function getMovies(page: number, filter: RatingFilter) {
    const { data } = await apiClient.get<MovieListResponse>("/discover/movie", {
        params: { page, ...ratingParams(filter) },
    })
    return {
        results: data.results.map(withPoster),
        total_pages: data.total_pages,
    }
}

export async function getMovieDetails(movieId: number): Promise<MovieDetail> {
    const { data } = await apiClient.get<MovieDetailResponse>(`/movie/${movieId}`)
    return {
        ...data,
        posterUrl: posterUrl(data.poster_path),
        backdropUrl: backdropUrl(data.backdrop_path),
    }
}

export async function getGuestSessionId() {
    const { data } = await apiClient.get("/authentication/guest_session/new");
    return data;
}
