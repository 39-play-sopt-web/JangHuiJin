import { Link } from 'react-router-dom'
import type { Movie } from '../apis/get'
import { formatReleaseDate } from '../utils/format'
import RatingBadge from './RatingBadge'

function MovieCard({ movie }: { movie: Movie }) {
    return (
        <li>
            <Link
                to={`/movies/${movie.id}`}
                className="movie-card flex flex-col hover:scale-105 duration-300 cursor-pointer bg-gray-200 rounded-lg"
            >
                {movie.posterUrl ? (
                    <div className="relative">
                        <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="aspect-[2/3] w-full rounded-lg object-cover"
                        />
                        <span className="absolute top-2 left-2">
                            <RatingBadge vote={movie.vote_average} />
                        </span>
                    </div>
                ) : (
                    <div className="aspect-[2/3] w-full rounded-lg bg-gray-300 flex items-center justify-center text-sm">
                        포스터 없음
                    </div>
                )}
                <div className="flex flex-col gap-1 px-2 py-2">
                    <h2 className="text-lg font-bold line-clamp-1">{movie.title}</h2>
                    <p className="text-sm text-mint font-bold line-clamp-1">{formatReleaseDate(movie.release_date)}</p>
                    <p className="text-sm text-gray-500 line-clamp-3">{movie.overview || '줄거리 정보가 없습니다.'}</p>
                </div>
            </Link>
        </li>
    )
}

export default MovieCard
