import React, {useState, useEffect} from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
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
          onLogout: logoutHandler, 
          onLogin: loginHandler}}>
              {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;