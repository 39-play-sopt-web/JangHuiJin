function RatingBadge({ vote }: { vote: number }) {
    return (
        <span className="bg-mint rounded-full px-2 py-1 text-sm font-bold">
            ★ {vote.toFixed(1)}
        </span>
    )
}

export default RatingBadge
