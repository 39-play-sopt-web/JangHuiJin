/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { createPortal } from "react-dom";

/* 배열 랜덤으로 셔플하는 함수 */
function shuffle(array) {
  const arr = [...array]; 
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


function makeNumbers(start, end) {
  const list = [];
  for (let number = start; number <= end; number++) {
    list.push(number);
  }
  return list;
}

function Game({ level, elapsedTime, onStart, onFinish, onRestart }) {
  const size = level == 1 ? 3 : level == 2 ? 4 : 5; /* 레벨 1: 3x3, 레벨 2: 4x4, 레벨 3: 5x5 */
  const half = size * size; /* 처음에 보여줄 앞 절반 개수 */
  const total = half * 2; /* 마지막 숫자. 18, 32, 50 */

  const [numbers, setNumbers] = useState(shuffle(makeNumbers(1, half)));
  const [numbers2, setNumbers2] = useState(shuffle(makeNumbers(half + 1, total)));
  /* 다음 숫자*/
  const [nextNumber, setNextNumber] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  /* 숫자 클릭 함수*/
  function handleClick(clickedNumber, index) {
    if (clickedNumber != nextNumber) { /* 클릭한 숫자가 다음 숫자가 아니면 무시 */
      return;
    }

    const newNumbers = [...numbers]; /* 화면 숫자 배열 복사 */

    if (clickedNumber <= half) { /* 앞 절반이면 그 자리에 뒷 절반의 첫 숫자를 넣는다 */
      newNumbers[index] = numbers2[0];
      setNumbers2(numbers2.slice(1)); /* 넣은 숫자는 뒷 절반 배열에서 뺀다 */
    } else { /* 뒷 절반이면 숫자와 배경을 없앤다 */
      newNumbers[index] = null;
    }

    setNumbers(newNumbers); /* 화면 숫자 배열 업데이트 */
    setNextNumber(nextNumber + 1); /* 다음 숫자 업데이트 */

    if (clickedNumber == 1) { /* 1을 누르면 타이머 시작 */
      onStart();
    }
    if (clickedNumber == total) { /* 마지막 숫자를 누르면 타이머를 멈추고 창을 연다 */
      onFinish();
      setShowAlert(true);
    }
  }

  let current = nextNumber; /* 현재 숫자 */
  if (current > total) { /* 현재 숫자가 마지막 숫자보다 크면 마지막 숫자로 설정 */
    current = total;
  }

  return (
    <section css={wrap}>
      <h2 css={next}>다음 숫자  <span css={number}>{current}</span>  ({current}/{total})</h2>
      <div css={board(size)}>
        {numbers.map((number, index) =>
          number == null ? (
            <div key={index} css={empty} /> /* 숫자가 없으면 배경도 없이 자리만 남김 */
          ) : (
            <button key={index} type="button" css={cell} onClick={() => handleClick(number, index)}>
              {number}
            </button>
          )
        )}
        </div>
      {showAlert &&
        createPortal( /* createPortal 함수를 사용하여 알럿 표시 */
          <div css={overlay}>
            <div css={alert}>
              <p css={title}>🎉Level {level} 클리어!🎉</p>
              <p css={clearTime}>{elapsedTime.toFixed(2)}초</p>
              <button type="button" css={confirm} onClick={onRestart}>
                확인
              </button>
            </div>
          </div>,
          document.body
        )}
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

const board = (size) => css`
  display: grid;
  grid-template-columns: repeat(${size}, 150px);
  gap: 10px;
`;

const empty = css`
  height: 150px;
`;

const overlay = css`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 40%);
`;

const alert = css`
  display: flex;
  flex-direction: column;
  width: 300px;
  background-color: white;
  align-items: center;
  gap: 20px;
  padding: 30px;
  border-radius: 10px;
`;

const title = css`
  margin: 0;
  font-size: 20px;
  font-weight: bold;
`;

const clearTime = css`
  margin: 0;
  font-size: 30px;
  font-weight: bold;
`;

const confirm = css`
  padding: 10px 40px;
  border: none;
  border-radius: 10px;
  background-color: #99f6df;
  font-size: 20px;
  font-weight: bold;
`;

const cell = css`
  height: 150px;
  border: none;
  border-radius: 10px;
  background-color: #99f6df;
  font-size: 30px;
  font-weight: bold;
  &:active {
    scale: 0.9;
    transition: scale 0.1s ease-in-out;
    background-color:rgb(147, 206, 191);
  }
`;
