/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { css } from "@emotion/react";

/* 레코드 기록 불러오기 */
function loadRecords() {
  const saved = localStorage.getItem("records");
  if (!saved) return [];
  return JSON.parse(saved);
}

/* 랭킹 표시 */
function Ranking() {
  const [records, setRecords] = useState(loadRecords);

  const sorted = [...records]; /* 레코드 기록 정렬 */
  sorted.sort((a, b) => {
    if (a.level != b.level) return b.level - a.level; /* 1. 레벨 내림차순 */
    return a.playTime - b.playTime; /* 2. 시간 오름차순 */
  });

  /* 레코드 기록 초기화 */
  function handleReset() {
    localStorage.removeItem("records");
    setRecords([]);
  }

  return (
    <section css={wrap}>
      <div css={top}>
        <h2 css={title}>🏆랭킹</h2>
        <button type="button" css={reset} onClick={handleReset}>
          초기화
        </button>
      </div>
      {sorted.length == 0 ? (
        <p css={empty}>아직 기록이 없어요. 게임을 플레이해보세요!</p>
      ) : (
        <div css={tableWrap}>
          <table css={table}>
            <thead>
              <tr css={head}>
                <th css={cell}>순위</th>
                <th css={cell}>레벨</th>
                <th css={cell}>플레이 시간</th>
                <th css={cell}>기록 시각</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((record, index) => (
                <tr key={index}>
                  <td css={cell}>{index + 1}</td>
                  <td css={cell}>Level {record.level}</td>
                  <td css={cell}>{record.playTime.toFixed(2)}초</td>
                  <td css={cell}>{record.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Ranking;

const wrap = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 600px;
  margin: 40px auto 0;
`;

const top = css`
  display: flex;
  justify-content: space-between;
`;

const title = css`
  margin: 0;
`;

const reset = css`
  padding: 10px;
  border: 1px solid var(--red);
  color: var(--red);
  border-radius: 10px;
  background-color: var(--white);
  width: 70px;
`;

const empty = css`
  text-align: center;
`;

const tableWrap = css`
  border: 1px solid var(--line);
  border-radius: 10px;
`;

const table = css`
  width: 100%;
  border-collapse: collapse;
`;

const head = css`
  background-color: var(--green);
`;

const cell = css`
  padding: 10px;
  text-align: center;
`;
