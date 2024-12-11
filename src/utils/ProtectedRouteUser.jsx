import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider.jsx";

export default function ProtectedRouteUser() {
  const { token, verifying } = useAuth();

  if (verifying) {
    // Wenn wir noch dabei sind, den Token zu verifizieren, kein Redirect durchführen!
    // Hier könnte man auch einen Loader oder ein Placeholder-Element rendern.
    return <div>Lade...</div>;
  }

  // Wenn verifiziert wurde und kein Token vorhanden ist, zurück zum Login
  return token ? <Outlet /> : <Navigate to="/login" />;
}
