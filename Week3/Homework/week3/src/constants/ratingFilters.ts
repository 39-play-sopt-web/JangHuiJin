// 버튼 글자와 평점 범위를 한곳에서 관리한다. max는 포함하지 않는다.
export interface RatingFilter {
    label: string
    min?: number
    max?: number
}

export const ratingFilters: RatingFilter[] = [
    { label: '전체' },
    { label: '9점 이상', min: 9 },
    { label: '8-9점', min: 8, max: 9 },
    { label: '7-8점', min: 7, max: 8 },
    { label: '6-7점', min: 6, max: 7 },
    { label: '6점 미만', max: 6 },
]

export function ratingParams(filter: RatingFilter) {
    const params: Record<string, number> = {}
    if (filter.min != null) params['vote_average.gte'] = filter.min
    // lte는 상한을 포함해서, 7.92처럼 사이에 끼는 값이 빠지지 않게 max까지 받아 온다.
    if (filter.max != null) params['vote_average.lte'] = filter.max
    return params
}

export function isInRating(vote: number, filter: RatingFilter) {
    if (filter.min != null && vote < filter.min) return false
    // 8점은 8-9점에만 두고, 7-8점에서는 빼서 구간이 겹치지 않게 한다.
    if (filter.max != null && vote >= filter.max) return false
    return true
}
