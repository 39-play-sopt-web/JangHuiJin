/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Game() {
  return (
    <section css={wrap}>
      <h2 css={next}>다음 숫자  <span css={number}>1</span>  (1/9)</h2>
      <div css={board}>
        {numbers.map((number) => (
          <button key={number} type="button" css={cell}>
            {number}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Game;

const wrap = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
`;

const next = css`

`;

const number = css`
  font-size: 50px;
  font-weight: bold;
`;

const board = css`
  display: grid;
  grid-template-columns: repeat(3, 150px);
  gap: 10px;
`;

const cell = css`
  height: 150px;
  border: none;
  border-radius: 10px;
  background-color: #99f6df;
  font-size: 30px;
  font-weight: bold;
`;
