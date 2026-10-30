import { useEffect, useState } from 'react'
import { getMovieDetails, type MovieDetail } from '../apis/get'

function MovieDetailPage({ movieId, onBack }: { movieId: number, onBack: () => void }) {
    const [movie, setMovie] = useState<MovieDetail | null>(null) 

    useEffect(() => { // 영화 상세 정보 가져오기
        let ignore = false
        const fetchMovie = async () => {
            try {
                const data = await getMovieDetails(movieId)
                if (!ignore) setMovie(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchMovie()
        return () => {
            ignore = true
        }
    }, [movieId]) // movieId가 바뀔 때마다 가져오기

    if (!movie) {
        return (
            <div className="mx-auto max-w-5xl p-10">
                <button onClick={onBack} className="text-sm font-bold cursor-pointer">← 목록으로 돌아가기</button>
            </div>
        )
    }

    //시간, 분 계산
    const hour = movie.runtime ? Math.floor(movie.runtime / 60) : 0
    const minute = movie.runtime ? movie.runtime % 60 : 0

    return (
        <div className="mx-auto max-w-5xl p-10 flex flex-col gap-8">
            <button onClick={onBack} className="text-sm text-mint font-bold cursor-pointer w-fit">
                ← 목록으로 돌아가기
            </button>

            <div className="relative rounded-lg overflow-hidden p-6 flex gap-6 items-start">
                {movie.backdrop_path && (
                    <img /* 배경 이미지 */
                        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-black/60" /> {/* 검정 반투명한 배경 */}

                {movie.poster_path && (
                    <img /* 포스터 이미지 */
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="relative w-40 rounded-lg"
                    />
                )}
                <div className="relative text-white flex flex-col gap-3">
                    <h1 className="text-2xl font-bold">{movie.title}</h1> {/* 제목 */}
                    <div className="flex items-center gap-3 text-sm">
                        <span className="bg-mint rounded-md text-black px-2 py-1 font-bold">★ {movie.vote_average.toFixed(1)}</span> {/* 평점 */}
                        <span>{movie.release_date.split('-')[0]}년 {movie.release_date.split('-')[1]}월 {movie.release_date.split('-')[2]}일</span>
                        <span>{hour}시간 {minute}분</span> {/* 시간, 분 */}
                        <span>투표 {movie.vote_count}명</span> {/* 투표 수 */}
                        <span className="border rounded-md px-2 py-1">{movie.status}</span> {/* 상태 */}
                    </div>
                    <div className="flex gap-2"> {/* 장르 */}
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
                <p className="text-sm">{movie.overview}</p>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-3">기본 정보</h2>
                <div className="grid grid-cols-4 gap-3">
                    <div className="bg-gray-200 rounded-lg p-3">
                        <p className="text-sm">원제</p>
                        <p className="font-bold">{movie.original_title}</p>
                    </div>
                    <div className="bg-gray-200 rounded-lg p-3">
                        <p className="text-sm">원어</p>
                        <p className="font-bold">{movie.original_language}</p>
                    </div>
                    <div className="bg-gray-200 rounded-lg p-3">
                        <p className="text-sm">제작 국가</p>
                        <p className="font-bold">{movie.production_countries.map((country) => country.name).join(', ')}</p>
                    </div>
                    <div className="bg-gray-200 rounded-lg p-3">
                        <p className="text-sm">사용 언어</p>
                        <p className="font-bold">{movie.spoken_languages.map((lang) => lang.english_name).join(', ')}</p>
                    </div>
                    <div className="bg-gray-200 rounded-lg p-3">
                        <p className="text-sm">예산</p>
                        <p className="font-bold">{movie.budget}</p>
                    </div>
                    <div className="bg-gray-200 rounded-lg p-3">
                        <p className="text-sm">수익</p>
                        <p className="font-bold">{movie.revenue}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetailPage
