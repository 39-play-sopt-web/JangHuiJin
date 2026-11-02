import { useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import Ranking from "./components/Ranking";

let timerId = null; 
let seconds = 0;
let startTime = 0;

function App() {
  const [currentTab, setCurrentTab] = useState("game"); 
  const [elapsedTime, setElapsedTime] = useState(0);
  const [level, setLevel] = useState(1); 

  /* 타이머 시작 */
  function startTimer() {
    if (timerId != null) return;

    startTime = Date.now(); /* 시작 시각 저장 */
    timerId = setInterval(() => {
      seconds = (Date.now() - startTime) / 1000; /* 실행이 늦어져도 실제 지난 시간으로 계산 */
      setElapsedTime(seconds); /* state에도 업데이트 */
    }, 10); /* 0.01초마다 실행 */
  }

  /* 타이머 종료 */
  function stopTimer() {
    seconds = (Date.now() - startTime) / 1000; /* 마지막 클릭 시점의 시간 저장 */
    setElapsedTime(seconds);
    clearInterval(timerId); 
    timerId = null;

    const saved = localStorage.getItem("records"); /* 로컬스토리지에 저장된 기록 문자열 */
    const records = saved ? JSON.parse(saved) : []; /* 로컬스토리지에 저장된 기록 배열 */
    records.push({ /* 로컬스토리지에 저장된 기록 배열에 추가 (날짜, 레벨, 플레이 시간) */
      date: new Date().toLocaleString(),
      level: level, /* 지금 선택한 레벨 */
      playTime: seconds,
    });
    localStorage.setItem("records", JSON.stringify(records)); /* 로컬스토리지에 3개의 정보를 저장 */
  }

  /* 레벨을 바꾸면 시간, 판을 초기화 */
  function changeLevel(event) {
    clearInterval(timerId);
    timerId = null;
    seconds = 0;
    setElapsedTime(0);
    setLevel(Number(event.target.value));
  }

  /* 확인을 누르면 타이머 초기화 */
  function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    seconds = 0;
    setElapsedTime(0);
  }

  /* 메뉴가 바뀌면 진행 중인 타이머도 초기화 */
  function changeTab(tab) {
    if (tab === currentTab) return;
    resetTimer();
    setCurrentTab(tab);
  }

  return (
    <>
      <Header
        currentTab={currentTab} /* 현재 탭 */
        onTabChange={changeTab}
        elapsedTime={elapsedTime} /* 헤더에 표시되는 초 */
        level={level}
        onLevelChange={changeLevel}
      />
      {currentTab === "game" && ( /* 게임 탭일 때만 게임 표시 */
        <Game
          key={level} /* 레벨이 바뀌면 게임을 새로 만들어 초기화 */
          level={level}
          elapsedTime={elapsedTime}
          onStart={startTimer}
          onFinish={stopTimer}
          onRestart={resetTimer}
        />
      )}
      {currentTab === "ranking" && <Ranking />}
    </>
  );
}

export default App;
