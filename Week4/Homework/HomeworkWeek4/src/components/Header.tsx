// 헤더 컴포넌트
import { NavLink as RouterLink, useNavigate } from "react-router";
import styled from "@emotion/styled";

function Header() {
  const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("authorizationCode");
        localStorage.removeItem("part");
        navigate("/");
    };

  // 타이틀 페이지에서 저장한 파트
  const part = localStorage.getItem("part");

  return (
    <Bar>
      <Brand>
        <Logo>PLAY SOPT <Board>BOARD</Board></Logo>
        {part && <PartBadge>{part} 파트</PartBadge>}
      </Brand>
      <Nav>
        <NavLink to="/posts">게시글 목록</NavLink>
        <NavLink to="/write">글쓰기</NavLink>
        <LogoutButton type="button" onClick={handleLogout}>로그아웃</LogoutButton>
      </Nav>
    </Bar>
  );
}

export default Header;

const Bar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 30px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.background};
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Logo = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`;

const Board = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const PartBadge = styled.span`
  padding: 4px 10px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  font-weight: 700;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 28px;
`;

const NavLink = styled(RouterLink)`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 700;
  transition: color 0.2s ease;
  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  text-decoration: none;
`;

const LogoutButton = styled.button`
  padding: 0;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  cursor: pointer;
  font-weight: 700;
`;
