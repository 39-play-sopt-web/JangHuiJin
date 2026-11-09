import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovieDetails, type MovieDetail } from '../apis/get'
import { formatMoney, formatReleaseDate } from '../utils/format'
import RatingBadge from './RatingBadge'

function MovieDetailPage() {
    const { movieId } = useParams()
    const navigate = useNavigate()
    const [movie, setMovie] = useState<MovieDetail | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const id = Number(movieId)
        if (!movieId || Number.isNaN(id)) {
            setError(true)
            setIsLoading(false)
            return
        }

        let ignore = false
        const fetchMovie = async () => {
            setIsLoading(true)
            setError(false)
            try {
                const data = await getMovieDetails(id)
                if (ignore) return
                setMovie(data)
                setIsLoading(false)
            } catch (err) {
                if (ignore) return
                console.error(err)
                setError(true)
                setIsLoading(false)
            }
        }

        fetchMovie()
        return () => {
            ignore = true
        }
    }, [movieId])

    const hour = movie?.runtime ? Math.floor(movie.runtime / 60) : 0
    const minute = movie?.runtime ? movie.runtime % 60 : 0

    const infoList = movie
        ? [
              { label: '원제', value: movie.original_title },
              { label: '원어', value: movie.original_language },
              { label: '제작 국가', value: movie.production_countries.map((country) => country.name).join(', ') },
              { label: '사용 언어', value: movie.spoken_languages.map((lang) => lang.english_name).join(', ') },
              { label: '예산', value: formatMoney(movie.budget) },
              { label: '수익', value: formatMoney(movie.revenue) },
          ]
        : []

    return (
        <div className="mx-auto max-w-5xl p-10 flex flex-col gap-8">
            <button
                type="button"
                onClick={() => navigate('/')}
                className="text-sm text-mint font-bold cursor-pointer w-fit"
            >
                ← 목록으로 돌아가기
            </button>

            {isLoading && <p>불러오는 중...</p>}
            {error && <p>영화 정보를 불러오지 못했습니다.</p>}

            {movie && (
                <>
                    <div className="relative rounded-lg overflow-hidden p-6 flex gap-6 items-start">
                        {movie.backdropUrl && (
                            <img
                                src={movie.backdropUrl}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        )}
                        <div className="absolute inset-0 bg-black/60" />

                        {movie.posterUrl ? (
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                className="relative w-40 aspect-[2/3] rounded-lg object-cover"
                            />
                        ) : (
                            <div className="relative w-40 aspect-[2/3] rounded-lg bg-gray-300 flex items-center justify-center text-sm text-black">
                                포스터 없음
                            </div>
                        )}

                        <div className="relative text-white flex flex-col gap-3">
                            <h1 className="text-2xl font-bold">{movie.title}</h1>
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                <RatingBadge vote={movie.vote_average} />
                                <span>{formatReleaseDate(movie.release_date)}</span>
                                {movie.runtime !== null && (
                                    <span>{hour}시간 {minute}분</span>
                                )}
                                <span>투표 {movie.vote_count}명</span>
                                <span className="border rounded-md px-2 py-1">{movie.status}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map((genre) => (
                                    <span key={genre.id} className="rounded-full px-3 py-1 text-sm text-mint border-mint bg-mint/20">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-2">줄거리</h2>
                        <p className="text-sm">{movie.overview || '줄거리 정보가 없습니다.'}</p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold mb-3">기본 정보</h2>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3">
                            {infoList.map((info) => (
                                <div key={info.label} className="bg-gray-200 rounded-lg p-3">
                                    <p className="text-sm">{info.label}</p>
                                    <p className="font-bold">{info.value || '정보 없음'}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default MovieDetailPage
