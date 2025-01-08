import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";

export default function ProtectedRouteUser() {
  const { token, verifying, logOut } = useAuth();
  const location = useLocation();
  const [checkingToken, setCheckingToken] = useState(false);

  useEffect(() => {
    const verifyTokenOnServer = async () => {
      if (!token) return;

      try {
        setCheckingToken(true);

        // Hier deinen Request an z.B. /api/v1/protectRoute
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/api/v1/protectRoute`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        // Wenn kein OK oder 2xx Status -> Token ungültig
        if (!response.ok) {
          logOut();
        }
      } catch (error) {
        // Netzwerkfehler oder andere Probleme -> ebenfalls ausloggen
        console.error("Fehler bei der Server-Prüfung des Tokens:", error);
        logOut();
      } finally {
        setCheckingToken(false);
      }
    };

    verifyTokenOnServer();
  }, [location, token, logOut]);

  if (verifying || checkingToken) {
    return <div>Lade...</div>;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
