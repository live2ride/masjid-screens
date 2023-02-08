import React, { createContext, useContext, useState } from "react";
import { MOCK, ScreensData } from "src/screens/types";

const defaultValue = MOCK;

type StateProps = ScreensData & {
  updateScreensData: (data: Partial<ScreensData>) => void;
};
const initialState = {
  ...defaultValue,
  updateScreensData: (data: Partial<ScreensData>) => {},
};
const ScreensContext = createContext(initialState);

type Props = {
  children: React.ReactNode;
};
export const ScreensProvider = ({ children }: Props) => {
  // const [data, setData] = useLocalStorage("settings", initialState);
  const [data, setData] = useState<StateProps>(initialState);

  const updateScreensData = (d: Partial<ScreensData>) => {
    setData({ ...data, ...d });
  };
  return (
    <ScreensContext.Provider
      value={{ ...data, updateScreensData: updateScreensData }}
    >
      {children}
    </ScreensContext.Provider>
  );
};

export const useScreensContext = () => {
  const context = useContext(ScreensContext);

  if (!context)
    throw new Error("useScreensContext must be use inside ScreensProvider");

  return context;
};
