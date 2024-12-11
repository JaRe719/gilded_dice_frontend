import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [verifying, setVerifying] = useState(true); 


  const login = async (receivedToken) => {
    sessionStorage.setItem("token", receivedToken);
    setToken(receivedToken);
  };

  const logOut = () => {
    setToken(null);
    sessionStorage.removeItem("token");
  };

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");

    if (!storedToken) {
      setVerifying(false);
      return;
    }


    
          // Token ist gespeichert, also versuchen wir ihn zu verifizieren
    fetch(`${process.env.REACT_APP_BACKEND}/api/v1/protectRoute`, {
      headers: {
        Authorization: "Bearer " + storedToken,
      },
    })
      .then((response) => {
        if (response.ok) {
          setToken(storedToken);
        } else {
          logOut();
        }
      })
      .finally(() => {
        // Verifizierung ist abgeschlossen, egal ob erfolgreich oder nicht
        setVerifying(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ token, verifying, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
