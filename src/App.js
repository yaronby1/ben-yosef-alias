import React, { useState, useEffect } from "react";

export default function App() {
  const [language, setLanguage] = useState("he");
  const [stage, setStage] = useState("intro");
  const [teams, setTeams] = useState(["קבוצה 1", "קבוצה 2"]);
  const [timeLimit, setTimeLimit] = useState(60);
  const [timer, setTimer] = useState(60);
  const [currentWord, setCurrentWord] = useState("");
  const [words] = useState({
    he: ["חתול", "כלב", "שולחן", "מחשב", "טלפון"],
    en: ["Cat", "Dog", "Table", "Computer", "Phone"]
  });
  const [currentTeam, setCurrentTeam] = useState(0);
  const [score, setScore] = useState([0, 0]);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setRunning(false);
    }
    return () => clearInterval(interval);
  }, [running, timer]);

  const startGame = () => {
    setStage("game");
    setRunning(true);
    setTimer(timeLimit);
    pickWord();
  };

  const pickWord = () => {
    const langWords = words[language];
    const randomIndex = Math.floor(Math.random() * langWords.length);
    setCurrentWord(langWords[randomIndex]);
  };

  const correctWord = () => {
    const newScore = [...score];
    newScore[currentTeam] += 1;
    setScore(newScore);
    pickWord();
  };

  const skipWord = () => pickWord();

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      {stage === "intro" && (
        <>
          <h1>בן יוסף Alias</h1>
          <select onChange={(e) => setLanguage(e.target.value)} value={language}>
            <option value="he">עברית</option>
            <option value="en">English</option>
          </select>
          <div>
            <input
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
            />
          </div>
          <button onClick={startGame}>התחל משחק</button>
        </>
      )}
      {stage === "game" && (
        <>
          <h2>{teams[currentTeam]}</h2>
          <h3>זמן: {timer}</h3>
          <h1>{currentWord}</h1>
          <button onClick={correctWord}>✔</button>
          <button onClick={skipWord}>➔</button>
        </>
      )}
    </div>
  );
}
