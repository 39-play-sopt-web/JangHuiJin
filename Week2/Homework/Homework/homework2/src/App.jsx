import { useState } from "react";
import Header from "./components/Header";

function App() {
  const [currentTab, setCurrentTab] = useState("game");

  return (
    <Header
      currentTab={currentTab}
      onTabChange={setCurrentTab}
      elapsedTime={0}
    />
  );
}

export default App;
