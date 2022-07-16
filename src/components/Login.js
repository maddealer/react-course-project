import { useState, useContext } from "react";
import { signIn } from "../utils/firebase";
import { useNavigate, Navigate } from "react-router-dom";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import "./forms.css";
const Login = () => {
  const { user } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    const res = await signIn(email, password);
    if (res.error) setError(res.error);
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };
  if (user) {
    return <Navigate replace to="/dashboard" />;
  }
  return (
    <>
      <div
        className="center"
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
          {/* <div className={styles.subtitle}>Let's create your account!</div> */}
          <div className={styles.subtitle}>Let's enter your account!</div>

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
              onKeyPress={(e) => handleEnter(e)}
            />
          </div>
          <button
            type="submit"
            className={styles["submit"]}
            onClick={handleSubmit}
          >
            Sign in
          </button>
          <span style={{ color: "#fff" }}>
            Don't have an account? <br />
            <Link
              to="/register"
              style={{ color: "#147fa6", textDecoration: "none" }}
            >
              Sign up
            </Link>
          </span>
        </div>
      </div>

      {/* </div> */}
    </>
  );
};
export default Login;
