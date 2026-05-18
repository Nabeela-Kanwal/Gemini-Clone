import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSent = async (prompt) => {
    const promptText = prompt || input;

    if (!promptText.trim()) {
      return;
    }

    setLoading(true);
    setShowResult(true);
    setRecentPrompt(promptText);
    setPrevPrompts((prev) => [...prev, promptText]);
    setInput("");

    try {
      const response = await runChat(promptText);
      setResultData(response);
    } catch (error) {
      console.error(error);
      setResultData(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    input,
    setInput,
    recentPrompt,
    prevPrompts,
    setPrevPrompts,
    showResult,
    loading,
    resultData,
    onSent,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
