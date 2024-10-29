import React, { createContext, useContext, useState, ReactNode } from "react";

interface NotificationContextProps {
  TasknotificationCount: number;
  setTaskNotificationCount: (count: number) => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [TasknotificationCount, setTaskNotificationCount] = useState<number>(0);

  return (
    <NotificationContext.Provider
      value={{ TasknotificationCount,setTaskNotificationCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider"
    );
  }
  return context;
};
