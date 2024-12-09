import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import "./Logging.css";

export default function LogIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const [error, setError] = useState("");

    // useEffect(()=>{
    //     sessionStorage.removeItem("token");
    // }, [])

    async function loginFunction(event) {
        event.preventDefault();
        setError("");
        const auth = {
            email,
            password,
        };

        const encoded = btoa(email + ":" + password);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND}/api/v1/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Basic " + encoded,
                    },
                    body: JSON.stringify(auth),
                }
            );
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("Unauthorized: Invalid email or password.");
                } else {
                    throw new Error(`Error: ${response.statusText}`);
                }
            }

            const data = await response.json();
            await sessionStorage.setItem("token", data.token);
            await login(data.token);
            await navigate("/home");
        } catch (error) {
            console.error("Error:", error.message);
            setError(error.message);
        }
    }

    return (
        <section className="login">
            <form onSubmit={loginFunction}>
                <h1>Login</h1>
                <div>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        placeholder="z.B. max@mustermann.de"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">
                        Passwort
                    </label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        placeholder="z.B. Password_123"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={!email || !password}
                >
                    Anmelden
                </button>
                <p className="errorMessage">{error}</p>

                <div className="switchLogger">
                    <Link to="/register">Kein Konto? Hier registrieren</Link>
                    <Link to="/home"> Angemeldet geklickt aber es passiert nichts? Klick hier</Link>
                </div>
                {/* <button type="submit">
                    Password vergessen?
                </button> */}
            </form>
        </section>
    );
}
