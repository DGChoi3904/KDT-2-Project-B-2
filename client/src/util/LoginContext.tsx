import React, { createContext, useState } from 'react';

interface LoginContextProps {
  loginCheck: boolean;
  setLoginCheck: (value: boolean) => void;
}

interface childrenProps {
  children: any;
}

interface MyWayProps {
  myWayUI: boolean;
  setMyWayUI: (value: boolean) => void;
  detail: boolean,
  setDetail: (value: boolean) => void,
  currentMyWayNameObj: {
    index: number;
    name: string;
  },
  setCurrentMyWayNameObj: (value: {index: number, name: string}) => void;
}

export const LoginContext = createContext<LoginContextProps>({
  loginCheck: false,
  setLoginCheck: () => {},
});

export const LoginContextProvider: React.FC<childrenProps> = ({ children }) => {
  const [loginCheck, setLoginCheck] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('loginCheck');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const handleLogin = () => {
    setLoginCheck(true);
    localStorage.setItem('loginCheck', JSON.stringify(true))
  }

  const handleLogout = () => {
    setLoginCheck(false);
    localStorage.removeItem('loginCheck');
  };

  const contextValue: LoginContextProps = {
    loginCheck,
    setLoginCheck: (value: boolean) => {
      if (value) {
        handleLogin();
      } else {
        handleLogout();
      }
    }
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};

export const MyWayContext = createContext<MyWayProps>({
  myWayUI: true,
  setMyWayUI: () => {},
  detail: false,
  setDetail: () => {},
  currentMyWayNameObj: {
    index: 0,
    name: '',
  },
  setCurrentMyWayNameObj: () => {},
});