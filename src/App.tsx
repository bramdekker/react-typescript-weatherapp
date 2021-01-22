import "./App.css";
import { ContentWrapper } from "./ContentWrapper";
import { useState } from "react";

function App() {
  const [isDay, setIsDay] = useState<boolean>(() => {
    const curHours = new Date().getHours();
    if (curHours >= 6 && curHours < 18) {
      return true;
    }

    return false;
  });

  const appClasses = "App " + (isDay ? "dayBackground" : "nightBackground");

  return (
    <div className={appClasses}>
      <ContentWrapper setParentState={setIsDay} />
    </div>
  );
}

export default App;
