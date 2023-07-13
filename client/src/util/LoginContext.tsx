import React, { createContext, useState } from 'react';

interface LoginContextProps {
  loginCheck: boolean;
  setLoginCheck: (value: boolean) => void;
}

interface childrenProps {
  children: any;
}

export const LoginContext = createContext<LoginContextProps>({
  loginCheck: false,
  setLoginCheck: () => {}
});

export const LoginContextProvider: React.FC<childrenProps> = ({ children }) => {
  const [loginCheck, setLoginCheck] = useState<boolean>(() => {
    const storedValue = localStorage.getItem('loginCheck');
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const handleLogout = () => {
    setLoginCheck(false);
    localStorage.removeItem('loginCheck');
  };

  const contextValue: LoginContextProps = {
    loginCheck,
    setLoginCheck: handleLogout
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};