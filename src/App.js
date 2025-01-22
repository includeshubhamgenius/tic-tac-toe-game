import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { FaRegCircle, FaBalanceScale } from "react-icons/fa";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0, Draws: 0 });
  const [theme, setTheme] = useState("light");
  const [winningLine, setWinningLine] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const winResult = calculateWinner(newBoard);
    if (winResult) {
      setWinningLine(winResult.line);
      const newScore = { ...score };
      newScore[xIsNext ? "X" : "O"] += 1;
      setScore(newScore);
    } else if (newBoard.every((cell) => cell)) {
      setWinningLine(null);
      setScore((prev) => ({ ...prev, Draws: prev.Draws + 1 }));
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinningLine(null);
  };

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : prev === "dark" ? "neon" : "light"
    );
  };

  const getClassForIcon = (value) => {
    const shadowX = "drop-shadow-forX";
    const shadowO = "drop-shadow-forO";
    if (theme === "light") {
      return value === "X" ? ` text-[#378ccd]` : `text-[#34bdd7]`;
    } else if (theme === "dark") {
      return value === "X" ? ` text-purple-900` : ` text-green-800`;
    } else {
      return value === "X"
        ? `${shadowX} text-red-300 `
        : `${shadowO} text-cyan-200`;
    }
  };

  const gridLineStyle = {
    light: "bg-gray-300",
    dark: "bg-gray-600",
    neon: "bg-cyan-200 shadow-neon",
  };

  const buttonStyle = {
    light: {
      reset: "bg-green-500 hover:bg-green-600 text-white",
      toggle: "bg-blue-500 hover:bg-blue-600 text-white",
    },
    dark: {
      reset: "bg-gray-800 hover:bg-gray-700 text-gray-400",
      toggle: "bg-blue-900 hover:bg-blue-800 text-gray-300",
    },
    neon: {
      reset: "bg-green-400 hover:bg-green-300 text-white shadow-neon2 hover:shadow-neonHover",
      toggle: "bg-blue-400 hover:bg-blue-300 text-white shadow-neonToggle hover:shadow-neonToggleHover",
    },
  };

  const getWinningLineStyle = () => {
    if (!winningLine) return {};
  
    const [a, b, c] = winningLine;
  
    // Define line colors based on the theme
    const lineColor =
      theme === "light"
        ? "bg-blue-300"
        : theme === "dark"
        ? "bg-yellow-500"
        : "bg-green-200 shadow-neon2"; // Neon theme
  
    // Map of cell positions to percentages
    const cellPositions = [
      { top: "16%", left: "16%" }, // Cell 0
      { top: "16%", left: "50%" }, // Cell 1
      { top: "16%", left: "84%" }, // Cell 2
      { top: "50%", left: "16%" }, // Cell 3
      { top: "50%", left: "50%" }, // Cell 4
      { top: "50%", left: "84%" }, // Cell 5
      { top: "84%", left: "16%" }, // Cell 6
      { top: "84%", left: "50%" }, // Cell 7
      { top: "84%", left: "84%" }, // Cell 8
    ];
  
    // Horizontal line
    if (a % 3 === 0 && b === a + 1 && c === a + 2) {
      return {
        top: cellPositions[a].top,
        width: "100%",
        height: "4px",
        className: lineColor,
        zIndex: 10,
      };
    }
  
    // Vertical line
    if (a < 3 && b === a + 3 && c === a + 6) {
      return {
        left: cellPositions[a].left,
        height: "100%",
        width: "4px",
        className: lineColor,
        zIndex: 10,
      };
    }
  
    // Diagonal line (top-left to bottom-right)
    if (a === 0 && b === 4 && c === 8) {
      return {
        top: "50%",
        left: "-12%",
        width: "320px",
        height: "4px",
        className: lineColor,
        transform: "rotate(44deg)",
        transformOrigin: "center",
        zIndex: 10,
      };
    }
  
    // Diagonal line (top-right to bottom-left)
    if (a === 2 && b === 4 && c === 6) {
      return {
        top: "50%",
        left: "-12%",
        width: "320px",
        height: "4px",
        className: lineColor,
        transform: "rotate(-44deg)",
        transformOrigin: "center",
        zIndex: 10,
      };
    }
  
    return {};
  };
  
  
  

  return (     <div className={`${theme === "neon" ? "neon" : theme}`}>
    <div className="h-screen flex flex-col justify-center items-center bg-white dark:bg-light-bg neon:bg-black transition-colors">
      <h1
        className={`text-4xl font-bold mb-4 ${
          theme === "neon"
            ? "text-cyan-200 drop-shadow-forO"
            : theme === "dark"
            ? "text-gray-400"
            : "text-black"
        }`}
      >
        Tic-Tac-Toe
      </h1>

      {/* Scoreboard */}
      <div
        className={`flex flex-col rounded-lg p-4 mb-6 border shadow-md ${
          theme === "neon"
            ? "border-cyan-200 border-2 bg-black text-[#08f] shadow-neon"
            : theme === "dark"
            ? "border-gray-700 bg-gray-800 text-gray-200"
            : "border-gray-300 text-gray-800"
        }`}
      >
        <div className="flex justify-between items-center text-lg mb-2 px-8">
          <RxCross2
            size={32}
            className={
              theme === "light"
                ? "text-[#378ccd] drop-shadow-custom"
                : getClassForIcon("X")
            }
          />
          <FaRegCircle
            size={26}
            className={
              theme === "light"
                ? "text-[#34bdd7] drop-shadow-custom"
                : getClassForIcon("O")
            }
          />
          <FaBalanceScale size={28} className="text-gray-500" />
        </div>
        <div className="flex justify-between items-center text-sm font-medium px-6 space-x-10 h-1">
          <div className="flex items-center gap-2">
            <span
              className={
                theme === "light" ? "text-[#378ccd]" : getClassForIcon("X")
              }
            >
              {score.X} Wins
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={
                theme === "light" ? "text-[#34bdd7]" : getClassForIcon("O")
              }
            >
              {score.O} Wins
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">{score.Draws} Draws</span>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="relative w-64 h-64">
        {/* Winning Line */}
        {/* Winning Line */}
{winningLine && (
  <div
    className={`absolute ${getWinningLineStyle().className}`}
    style={{
      ...getWinningLineStyle(),
      className: undefined, // Remove className from the inline style object
    }}
  />
)}


        {/* Horizontal Lines */}
        <div
          className={`absolute top-1/3 w-full h-0.5 ${gridLineStyle[theme]}`}
        ></div>
        <div
          className={`absolute top-2/3 w-full h-0.5 ${gridLineStyle[theme]}`}
        ></div>

        {/* Vertical Lines */}
        <div
          className={`absolute left-1/3 h-full w-0.5 ${gridLineStyle[theme]}`}
        ></div>
        <div
          className={`absolute left-2/3 h-full w-0.5 ${gridLineStyle[theme]}`}
        ></div>

        <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
          {board.map((value, index) => (
            <div
              key={index}
              className="flex justify-center items-center"
              onClick={() => handleClick(index)}
            >
              {value === "X" && (
                <RxCross2 size={80} className={getClassForIcon(value)} />
              )}
              {value === "O" && (
                <FaRegCircle size={60} className={getClassForIcon(value)} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleReset}
          className={`px-4 py-2 rounded-lg shadow-md transform transition-transform hover:scale-105 ${buttonStyle[theme].reset}`}
        >
          Reset Board
        </button>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-lg shadow-md transform transition-transform hover:scale-105 ${buttonStyle[theme].toggle}`}
        >
          Toggle Theme ({theme})
        </button>
      </div>
    </div>
  </div>
);
}

function calculateWinner(board) {
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

for (let [a, b, c] of lines) {
  if (board[a] && board[a] === board[b] && board[a] === board[c]) {
    return { winner: board[a], line: [a, b, c] };
  }
}
return null;
}

export default App;

