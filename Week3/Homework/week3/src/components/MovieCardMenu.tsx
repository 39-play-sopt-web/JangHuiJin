import { ratingFilters, type RatingFilter } from '../constants/ratingFilters'

function MovieCardMenu({
    selectedCategory,
    onSelectCategory,
}: {
    selectedCategory: RatingFilter
    onSelectCategory: (filter: RatingFilter) => void
}) {
    return (
        <>
            <h1 className="text-3xl font-bold">영화 둘러보기</h1>
            <div className="movie-card-menu flex items-center">
                <ul className="flex flex-wrap items-center gap-4">
                    {ratingFilters.map((filter) => (
                        <li key={filter.label}>
                            <button
                                type="button"
                                aria-pressed={selectedCategory.label === filter.label}
                                onClick={() => onSelectCategory(filter)}
                                className={`px-4 py-2 rounded-full cursor-pointer text-sm font-bold duration-300 ${
                                    selectedCategory.label === filter.label
                                        ? 'bg-mint'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                            >
                                {filter.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default MovieCardMenu
