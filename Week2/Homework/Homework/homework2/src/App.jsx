import { useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";

function App() {
  const [currentTab, setCurrentTab] = useState("game");

  return (
    <>
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        elapsedTime={0}
      />
      {currentTab === "game" && <Game />}
    </>
  );
}

export default App;
