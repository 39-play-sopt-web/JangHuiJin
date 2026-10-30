//무비카드를 구현한다. 우선 가운데 영화 둘러보기라는 글씨가 있고, 아래에 가로로 카테고리를 선택하는 메뉴, 그리고 그 아래에 무비카드

import { useEffect, useState } from 'react'
import { getMovies, type Movie } from '../apis/get'
import MovieCardMenu from './MovieCardMenu'

function MovieCard() {
    const [movies, setMovies] = useState<Movie[]>([]) // 화면에 보여줄 영화 목록
    const [page, setPage] = useState(1) // useState로 페이지 번호를 관리
    const [selectedCategory, setSelectedCategory] = useState('전체') // 선택된 카테고리
    const handleSelect = (category: string) => { // 카테고리 선택 핸들러
        setMovies([]) // 영화 목록 초기화
        setPage(1) // 페이지 번호 초기화
        setSelectedCategory(category) // 선택된 카테고리 업데이트
    }

    // page 값이 바뀔 때마다 그 페이지의 영화를 가져온다 (무한스크롤)
    // 처음엔 page가 1이라 첫 페이지를 가져오고,
    // page 번호를 올리면 다음 페이지를 가져온다
    useEffect(() => {
        let ignore = false; // 영화 목록을 가져오는 중에 다른 페이지로 이동하면 영화 목록을 가져오는 것을 중단시키는 역할 
        const fetchMovies = async () => {
            try {
                const { results } = await getMovies(page, selectedCategory); // 이번 page의 영화 배열
                if (ignore) return;
                setMovies((prev: Movie[]) => [...prev, ...results]) // prev: 이미 받아 둔 목록, results: 이번 page의 영화 배열, ...:배열을 합치는 연산자
                setPage((prev: number) => prev + 1); // page 번호를 올리면 page가 바뀌므로 위의 useEffect가 한 번 더 실행된다
            } catch (error) {
                console.error(error);
            }
        };
        fetchMovies(); 
        return () => {
            ignore = true;
        };
    }, [page, selectedCategory]); // page와 selectedCategory가 바뀔 때마다 그 페이지의 영화를 가져온다

    
    return (
        <div className="movie-container mx-auto max-w-5xl p-10 flex flex-col items-start gap-7">
            <MovieCardMenu
                selectedCategory={selectedCategory} // 선택된 카테고리 표시
                setSelectedCategory={handleSelect} // 카테고리 선택 핸들러
            />
            <div className="movie-card-list grid w-full grid-cols-5 gap-4"> 
                    {movies.map((movie) => (
                        <li key={movie.id} className = "movie-card flex flex-col hover:scale-105 duration-300 cursor-pointer bg-gray-200 rounded-lg">
                        <div className="relative">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            alt={movie.title} 
                            className="aspect-[3/4] w-full rounded-lg object-cover" />
                                <span className="rate-text absolute px-2 py-1 top-2 left-2 bg-mint rounded-full text-sm font-bold">
                                    ★ {movie.vote_average.toFixed(1)}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1 px-2 py-2">
                            <h2 className="text-lg font-bold line-clamp-1">{movie.title}</h2>
                            <p className="text-sm text-mint font-bold line-clamp-1">{movie.release_date}</p>
                            <p className="text-sm text-gray-500 line-clamp-3">{movie.overview}</p>
                        </div>
                    </li>
                ))}
            </div>
        </div>
    );
}
export default MovieCard;
