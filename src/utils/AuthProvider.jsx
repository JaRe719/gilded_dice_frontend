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
    const verifyToken = async () => {
      const storedToken = sessionStorage.getItem("token");
      
      // Fall 1: Kein Token vorhanden -> nichts zu verifizieren
      if (!storedToken) {
        setVerifying(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/api/v1/protectRoute`,
          {
            method: "GET", // oder POST, je nach Backend
            headers: {
              Authorization: "Bearer " + storedToken,
            },
          }
        );

        // Wenn z.B. 401 oder ein anderer Fehler kommt -> logOut
        if (!response.ok) {
          logOut();
        }

        // Optional: Inhalt decodieren, wenn dein Server weitere Infos schickt
        // const data = await response.json();
        // console.log("Server-Antwort:", data);

      } catch (error) {
        // Hier könntest du z.B. einen Netzwerkfehler abfangen
        console.error("Fehler beim Verifizieren des Tokens:", error);
        logOut();
      } finally {
        // Verifizierung ist abgeschlossen, egal ob erfolgreich oder nicht
        setVerifying(false);
      }
    };

    verifyToken();
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
