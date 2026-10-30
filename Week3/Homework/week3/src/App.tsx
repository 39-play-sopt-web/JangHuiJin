import { useState } from 'react'
import Header from './components/Header'
import MovieCard from './components/MovieCard'
import MovieDetailPage from './components/MovieDetailPage'
import './App.css'

function App() {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null)

  return (
    <div>
      <Header />
      {selectedMovieId === null ? (
        <MovieCard onSelectMovie={setSelectedMovieId} />
      ) : (
        <MovieDetailPage
          movieId={selectedMovieId}
          onBack={() => setSelectedMovieId(null)}
        />
      )}
    </div>
  )
}

export default App
