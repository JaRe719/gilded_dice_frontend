import { useState, useEffect } from "react";
import "./Logging.css";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailValidation, setEmailValidation] = useState(true);
    const [isValid, setIsValid] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
        sessionStorage.removeItem("token");
    }, [])

    useEffect(() => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
        } else {
            setError("");
        }
    }, [password, confirmPassword]);

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    useEffect(() => {
        if (validateEmail(email)) {
            setEmailValidation(true);
        } else {
            setEmailValidation(false);
        }
    }, [email]);

    useEffect(() => {
        if (confirmPassword !== "" && email !== "") {
            if (password !== confirmPassword) {
                setMessage("Passwörter simmen nicht überein!");
                setIsValid(true);
            } else {
                setMessage("");
                setIsValid(false);
            }
        }
    }, [password, confirmPassword, email]);

    async function signup(event) {
        event.preventDefault();
        const registrationData = { email, username: username, password };
        setLoading(true);
        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND}/api/v1/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(registrationData),
                }
            );
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            navigate("/home");
        } catch (error) {
            console.error("Error:", error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="register" >
            <form
                onSubmit={signup}
                
            >
                <h1 >
                    Registrieren
                </h1>
                <div >
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
                    <label htmlFor="userName" >
                        Nutzername
                    </label>
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        id="userName"
                        placeholder="z.B. Player1"
                        required
                    />
                </div>
                
                <div >
                    <label htmlFor="password" >
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
                <div>
                    <label
                        htmlFor="confirmPassword"
                    >
                        Passwort bestätigen
                    </label>
                    <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        id="confirmPassword"
                        placeholder="z.B. Password_123"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={
                        isValid ||
                        !username ||
                        !email ||
                        !emailValidation
                    }
                >
                    {loading ? (
                        <span>Loading ...</span>
                    ) : (
                        "Registrieren"
                    )}
                </button>
                <div className="switchLogger" >
                    <Link to="/login">Bereits registriert? Hier anmelden</Link>
                </div>
                {message ? (
                    <p className="errorMessage">{message}</p>
                ) : (
                    <p className="errorMessage">{error}</p>
                )}
            </form>
        </section>
    );
}
