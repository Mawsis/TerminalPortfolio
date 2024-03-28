import { useEffect, useRef, useState } from "react";
import "./App.css";
import { handleCat, handleCd, handleLs } from "./utils/handleCommand";

const commands = ["ls", "l", "cd", "cat"];
const isSubstringInArray = (string, array) => {
  for (let i = 0; i < array.length; i++) {
    if (string.includes(array[i])) {
      return true;
    }
  }
  return false;
};

function App() {
  const [additionalDirectory, setAdditionalDirectory] = useState("");
  const [actualInput, setActualInput] = useState(<></>);
  const [isFocused, setIsFocused] = useState(false);
  const inputText = useRef(null);
  const [commandsUsed, setCommandsUsed] = useState([]);
  const [messagesSent, setMessagesSent] = useState([]);
  const focusTerminal = () => {
    inputText.current.focus();
  };
  const inputChanged = (e) => {
    if (isSubstringInArray(e.target.value, commands)) {
      setActualInput(
        <>
          {commands.includes(e.target.value.split(" ")[0]) && (
            <span className="text-blue-400">
              {e.target.value.split(" ")[0]}
              {e.target.value.includes(" ") && " "}
            </span>
          )}
          {e.target.value.split(" ").slice(1).join(" ")}
        </>
      );
    } else {
      setActualInput(<>{e.target.value}</>);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value) {
      const wholeInput = e.target.value;
      const command = e.target.value.split(" ")[0];
      const rest = e.target.value.split(" ").slice(1).join(" ");
      setCommandsUsed((prev) => [
        ...prev,
        <div>
          <p className=" text-blue-500">
            <span className="text-green-500">(</span>mawsis@kali
            <span className="text-green-500">) - [</span>
            <span className="text-white">
              ~/React/TerminalPortfolio{additionalDirectory}
            </span>
            <span className="text-green-500">]</span>
          </p>
          <div className="flex gap-3">
            <p className="text-blue-500">$ </p>
            <span className="">{actualInput}</span>
          </div>
        </div>,
      ]);
      switch (command) {
        case "cd":
          const [dir, message] = handleCd(additionalDirectory, wholeInput);
          setAdditionalDirectory(dir);
          setMessagesSent((prev) => [...prev, message]);
          break;
        case "ls":
          setMessagesSent((prev) => [
            ...prev,
            handleLs(additionalDirectory, wholeInput),
          ]);
          break;
        case "l":
          setMessagesSent((prev) => [
            ...prev,
            handleLs(additionalDirectory, wholeInput),
          ]);
          break;
        case "cat":
          setMessagesSent((prev) => [
            ...prev,
            handleCat(additionalDirectory, wholeInput),
          ]);
          break;
        default:
          setMessagesSent((prev) => [
            ...prev,
            <div className="text-red-400">{wholeInput} : Unknown command</div>,
          ]);
          break;
      }
      setActualInput("");
      e.target.value = "";
    }
  };
  useEffect(() => {
    inputText.current.scrollIntoView();
  }, [actualInput]);

  return (
    <>
      <div className=" w-screen h-screen flex justify-center items-center bg-[url('./assets/bg.jpg')]">
        <div
          onClick={focusTerminal}
          className="mockup-window parent w-1/2 h-1/2 border border-gray-600 opacity-90 bg-black"
        >
          <div className="h-full w-full child flex flex-col bg-gray-950 p-2">
            {commandsUsed.map((command, index) => {
              return (
                <>
                  <div key={index * 2}>{command}</div>
                  <div key={index * 2 + 1}>{messagesSent[index]}</div>
                </>
              );
            })}
            <div>
              <p className=" text-blue-500">
                <span className="text-green-500">(</span>mawsis@kali
                <span className="text-green-500">) - [</span>
                <span className="text-white">
                  ~/React/TerminalPortfolio{additionalDirectory}
                </span>
                <span className="text-green-500">]</span>
              </p>
              <div className="flex gap-3">
                <p className="text-blue-500">$ </p>
                <span className="">
                  {actualInput}
                  {isFocused && (
                    <span className="inline-block bg-white animate-blink">
                      &nbsp;
                    </span>
                  )}
                </span>
                <input
                  onKeyDown={handleKeyDown}
                  ref={inputText}
                  type="text"
                  onChange={inputChanged}
                  className=" opacity-0"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
