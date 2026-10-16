import { useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";

let timerId = null; 
let seconds = 0;

function App() {
  const [currentTab, setCurrentTab] = useState("game"); 
  const [elapsedTime, setElapsedTime] = useState(0); 
  const [round, setRound] = useState(0); 
  const [level, setLevel] = useState(1); 

  /* 타이머 시작 */
  function startTimer() {
    if (timerId != null) return;

    timerId = setInterval(() => {
      seconds = Math.round((seconds + 0.01) * 100) / 100; /* 0.01초를 더하고 소수 둘째 자리로 정리 */
      setElapsedTime(seconds); /* state에도 업데이트 */
    }, 10); /* 0.01초마다 실행 */
  }

  /* 타이머 종료 */
  function stopTimer() {
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

  /* 완료 버튼을 눌렀을 때 타이머 초기화 */
  function resetTimer() {
    clearInterval(timerId); 
    timerId = null;
    seconds = 0; 
    setElapsedTime(0); 
    setRound(round + 1);
  }

  return (
    <>
      <Header
        currentTab={currentTab} /* 현재 탭 */
        onTabChange={setCurrentTab} /* 탭 버튼을 눌렀을 때 currentTab 업데이트 */
        elapsedTime={elapsedTime} /* 헤더에 표시되는 초 */
        level={level}
        onLevelChange={changeLevel}
      />
      {currentTab === "game" && ( /* 게임 탭일 때만 게임 표시 */
        <Game
          key={level + "-" + round} /* 레벨이나 라운드가 바뀌면 판을 새로 만듦 */
          level={level}
          elapsedTime={elapsedTime}
          onStart={startTimer}
          onFinish={stopTimer}
          onRestart={resetTimer}
        />
      )}
    </>
  );
}

export default App;
