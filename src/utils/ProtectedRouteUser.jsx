import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
import { useAuth } from "./AuthProvider";

const ProtectedRouteUser = (props) => {
  const auth = useAuth();
  const { token } = auth;
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!token) {
      auth.logOut();
      navigate("/home");
    }
    // const decodedToken = jwtDecode(token);
    if (token)
    {
      navigate("/home");
    }
  }, [token, auth, navigate]);

  return <Outlet {...props} />;
};

export default ProtectedRouteUser;
