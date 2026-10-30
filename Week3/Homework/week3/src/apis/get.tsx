import apiClient from "./apiClient";

export interface Movie {
    id: number
    title: string
    poster_path: string | null
    vote_average: number
    release_date: string
    overview: string
}

export interface MovieListResponse {
    results: Movie[]
}

export async function getMovies(page: number) {
    const { data } = await apiClient.get<MovieListResponse>("/discover/movie", {
        params: { page },
    })
    return data
}

export async function getMovieDetails(movieId: string) {
    const {data} = await apiClient.get("/movie/${movieId}");
    return data;
}

export async function getGuestSessionId() {
    const {data} = await apiClient.get("/authentication/guest_session/new");
    return data;
}

