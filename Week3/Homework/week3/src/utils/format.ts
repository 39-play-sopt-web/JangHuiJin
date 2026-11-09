const IMAGE_BASE = 'https://image.tmdb.org/t/p'

export function posterUrl(path: string | null) {
    if (!path) return null
    return `${IMAGE_BASE}/w500${path}`
}

export function backdropUrl(path: string | null) {
    if (!path) return null
    return `${IMAGE_BASE}/w1280${path}`
}

export function formatReleaseDate(date: string) {
    if (!date) return '개봉일 정보 없음'
    const [year, month, day] = date.split('-')
    if (!year || !month || !day) return '개봉일 정보 없음'
    return `${year}년 ${Number(month)}월 ${Number(day)}일`
}

export function formatMoney(amount: number) {
    if (!amount) return '정보 없음'
    return `$${amount.toLocaleString('en-US')}`
}
