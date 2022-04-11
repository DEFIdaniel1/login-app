import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/Store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //checks if user is logged in and will first relog them in again first
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "1") {
      setIsLoggedIn(true);
    }
  }, []);
  
  const loginHandler = (email, password) => {
    //stores login status in the localstorage
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    //ensure login status is set to false
    localStorage.setItem("isLoggedIn", "0");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler}}>
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
