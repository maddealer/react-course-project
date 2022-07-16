import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { signUp, signingOut } from "../utils/firebase";
import AuthContext from "../AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import styles from "./Login.module.css";
const Register = () => {
  const { user } = useContext(AuthContext);
  console.log("inregister", user);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === "") {
      setError("Passwords do not match");
    } else {
      setEmail("");
      setName("");
      setPassword("");
      const res = await signUp(email, password, name);

      if (res.error) setError(res.error);
    }
  };
  if (user) {
    return <Navigate replace to="/dashboard" />;
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className={styles.form}>
          {error ? <div className="auth__error">{error}</div> : null}
          <div className={styles.title}>Welcome</div>
          <div className={styles.subtitle}>Let's create your account!</div>

          <div className={styles["input-container ic1"]}>
            <label htmlFor="email" className={styles["placeholder"]}>
              Email
            </label>
            <input
              id="email"
              value={email}
              className={styles.input}
              type="email"
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles["input-container ic2"]}>
            <label htmlFor="password" className={styles["placeholder"]}>
              Password
            </label>
            <input
              id="password"
              value={password}
              className={styles["input"]}
              type="password"
              placeholder=" "
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={styles["submit"]}
            onClick={handleSubmit}
          >
            Sign up
          </button>
          <span style={{ color: "#fff" }}>
            Already have an account? <br />
            <Link
              to="/login"
              style={{ color: "#147fa6", textDecoration: "none" }}
            >
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};
export default Register;
