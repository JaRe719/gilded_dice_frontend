import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";

export default function LogIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const [error, setError] = useState("");

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
                import.meta.env.BACKEND + "/api/v1/auth/login",
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
            console.log(data);
            login(data.token);
            navigate("/home");
        } catch (error) {
            console.error("Error:", error.message);
            setError(error.message);
        }
    }

    return (
        <section>
            <form onSubmit={loginFunction}>
                <h2>Login</h2>
                <div>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
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
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={!email || !password}
                >
                    Anmelden
                </button>
                <p>{error}</p>

                <div>
                    <Link to="/signup">Kein Konto? Hier registrieren</Link>
                </div>
                {/* <button type="submit">
                    Password vergessen?
                </button> */}
            </form>
        </section>
    );
}
