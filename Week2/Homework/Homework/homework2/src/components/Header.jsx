/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function Header({ elapsedTime, currentTab, onTabChange, level, onLevelChange }) {
  return (
    <header css={header}>
      <h2 css={title}>🔢숫자 클릭 게임</h2>
      <nav css={center}>
        <button
          type="button"
          css={[button, currentTab === "game" && selected]}
          onClick={() => onTabChange("game")}
        >
          게임
        </button>
        <button
          type="button"
          css={[button, currentTab === "ranking" && selected]}
          onClick={() => onTabChange("ranking")}
        >
          랭킹
        </button>
      </nav>
      <div css={right}>
        {currentTab === "game" && (
          <>
            <select value={level} onChange={onLevelChange} css={select} aria-label="레벨 선택">
              <option value="1">Level 1 (3x3)</option>
              <option value="2">Level 2 (4x4)</option>
              <option value="3">Level 3 (5x5)</option>
            </select>
            <span css={timer}>{elapsedTime.toFixed(2)}초</span>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

const header = css`
  display: flex;
  align-items: center;
  background-color: var(--gray);
  padding: 0 30px;
`;

const title = css`
  flex: 1;
`;

const center = css`
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const button = css`
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  background-color: transparent;
  font-size: 20px;
  font-weight: bold;

  &:hover {
    background-color: var(--green-light);
  }
`;

const selected = css`
  background-color: var(--green);
`;

const right = css`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

const select = css`
  padding: 10px 10px;
  border-radius: 10px;
  background-color: var(--white);
`;

const timer = css`
  padding: 10px 20px;
  border-radius: 10px;
  background-color: var(--green);
  font-weight: bold;
`;
