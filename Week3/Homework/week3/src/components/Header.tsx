import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="header flex items-center justify-start p-5 pl-8 border-b-3 border-line">
        <div className="header-text text-2xl font-bold">
      <h1>
        <Link to="/">PLAY SOPT <span className="text-mint">MOVIE</span></Link>
      </h1>
        </div>
  </div>
  );
}

export default Header;
