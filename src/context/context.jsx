import { createContext } from "react";
import runChat from "../config/gemini";
export const Context = createContext();

const contextProvider = (props) => {
  const onSent = async (prompt) => {
    runChat;
  };
  const contextValue = {};
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default contextProvider;
