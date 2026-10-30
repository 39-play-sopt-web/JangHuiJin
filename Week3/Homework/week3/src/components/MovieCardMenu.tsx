import { useState } from 'react'

const categories = ['전체', '9점 이상', '8-9점', '7-8점', '6-7점', '6점 미만']

function MovieCardMenu({ selectedCategory, setSelectedCategory }: 
    { selectedCategory: string, 
        setSelectedCategory: (category: string) => void }
    ) {
    return (
        <>
        <h1 className="text-3xl font-bold">영화 둘러보기</h1>
        <div className="movie-card-menu flex items-center">
            <ul className="flex items-center justify-center gap-4">
                {categories.map((item, index) => (
                    <li
                        key={index}
                        className={`px-4 py-2 bg-gray-200 rounded-full cursor-pointer text-sm font-bold duration-300 ${
                            selectedCategory === item
                                ? 'bg-mint'
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {/* 카테고리를 클릭하면 버튼이 부모에게 글자를 넘긴다. 예를 들어 handleSelect('9점 이상')이 실행됨, MovieCard.tsx의 41-44 참고*/}
                        <button onClick={() => setSelectedCategory(item)}>{item}</button> 
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}

export default MovieCardMenu
