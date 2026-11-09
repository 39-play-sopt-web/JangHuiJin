import { useEffect, useRef, useState } from 'react'
import { getMovies, type Movie } from '../apis/get'
import { isInRating, ratingFilters, type RatingFilter } from '../constants/ratingFilters'
import MovieCard from './MovieCard'
import MovieCardMenu from './MovieCardMenu'

function MovieList() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [page, setPage] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState(ratingFilters[0])
    const [hasNextPage, setHasNextPage] = useState(true)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)

    const handleSelect = (filter: RatingFilter) => {
        if (filter.label === selectedCategory.label) return
        setMovies([])
        setPage(1)
        setHasNextPage(true)
        setError(false)
        setSelectedCategory(filter)
    }

    useEffect(() => {
        let ignore = false

        const fetchMovies = async () => {
            setLoading(true)
            setError(false)
            try {
                const data = await getMovies(page, selectedCategory)
                if (ignore) return
                const results = data.results.filter((movie) => isInRating(movie.vote_average, selectedCategory))
                setMovies((prev) => (page === 1 ? results : [...prev, ...results]))
                setHasNextPage(page < data.total_pages)
                setLoading(false)
            } catch (err) {
                if (ignore) return
                console.error(err)
                setError(true)
                setHasNextPage(false)
                setLoading(false)
            }
        }

        fetchMovies()
        return () => {
            ignore = true
        }
    }, [page, selectedCategory])

    // 로딩 중이거나 마지막 페이지면 감지 요소를 그리지 않아서, 다음 요청이 연달아 나가지 않는다.
    useEffect(() => {
        if (loading || !hasNextPage) return
        const node = bottomRef.current
        if (!node) return

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prev) => prev + 1)
            }
        })

        observer.observe(node)
        return () => observer.disconnect()
    }, [loading, hasNextPage])

    return (
        <div className="movie-container mx-auto max-w-5xl p-10 flex flex-col items-start gap-7">
            <MovieCardMenu selectedCategory={selectedCategory} onSelectCategory={handleSelect} />
            {error && <p>영화 목록을 불러오지 못했습니다.</p>}
            <ul className="movie-card-list grid w-full grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </ul>
            {loading && <p>불러오는 중...</p>}
            {!loading && hasNextPage && <div ref={bottomRef} className="h-8 w-full" />}
        </div>
    )
}

export default MovieList
