import apiClient from "./apiClient";

export interface Movie { // 영화 정보
    id: number
    title: string
    poster_path: string | null
    vote_average: number
    release_date: string
    overview: string
}

export interface MovieListResponse { // 영화 목록 응답
    results: Movie[]
}

function ratingParams(category: string) { // 평점 기준 파라미터
    switch (category) {
        case '9점 이상':
            return { 'vote_average.gte': 9 }
        case '8-9점':
            return { 'vote_average.gte': 8, 'vote_average.lte': 8.9 }
        case '7-8점':
            return { 'vote_average.gte': 7, 'vote_average.lte': 7.9 }
        case '6-7점':
            return { 'vote_average.gte': 6, 'vote_average.lte': 6.9 }
        case '6점 미만':
            return { 'vote_average.lte': 5.9 }
        default:
            return {}
    }
}

export async function getMovies(page: number, category: string) { // 영화 목록 가져오기 api
    const { data } = await apiClient.get<MovieListResponse>("/discover/movie", {
        params: { page, ...ratingParams(category) },
    })
    return data
}

export async function getMovieDetails(movieId: string) { // 영화 상세 정보 가져오기 api
    const {data} = await apiClient.get("/movie/${movieId}");
    return data;
}

export async function getGuestSessionId() { // 게스트 세션 아이디 가져오기 api
    const {data} = await apiClient.get("/authentication/guest_session/new");
    return data;
}

