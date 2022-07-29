import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../utils/firebase";
import AuthContext from "../AuthContext";
import { Navigate } from "react-router-dom";
import styles from "./Login.module.css";
import { regFormValidator } from "../utils/validators";
const Register = () => {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("Guest Relations");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = regFormValidator(email, name, password);
    if (!validate.status) {
      setError(validate.msg);
      return;
    }
    try {
      setEmail("");
      setName("");
      setPassword("");
      const res = await signUp(email, password, name, department);
      if (res.error) setError(res.error);
    } catch (err) {
      console.log(err);
    }
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
              placeholder=""
              onChange={(e) => setEmail(e.target.value)}
              maxLength="50"
            />
          </div>
          <div className={styles["input-container ic1"]}>
            <label htmlFor="name" className={styles["placeholder"]}>
              Name
            </label>
            <input
              id="name"
              value={name}
              className={styles.input}
              type="text"
              placeholder=""
              maxLength="50"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div
            style={{ display: "flex", flexDirection: "row" }}
            className={styles["input-container ic1"]}
          >
            <label htmlFor="fruits" className={styles["placeholder"]}>
              Department
            </label>{" "}
            <select
              id="fruits"
              name="fruits"
              defaultValue={department}
              onChange={(e) => setDepartment(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option>Guest Relations</option>
              <option>PIT</option>
              <option>Marketing</option>
            </select>
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
              placeholder=""
              maxLength="50"
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => handleEnter(e)}
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
