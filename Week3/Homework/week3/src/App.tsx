import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import MovieDetailPage from './components/MovieDetailPage'
import MovieList from './components/MovieList'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<MovieList />} />
        <Route path="/movies/:movieId" element={<MovieDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App
