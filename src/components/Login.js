import { useState, useContext } from "react";
import { signIn } from "../utils/firebase";
import { useNavigate, Navigate } from "react-router-dom";
import AuthContext from "../AuthContext";

import "./forms.css";
const Login = () => {
  const { user } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    const res = await signIn(email, password);
    if (res.error) seterror(res.error);
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
        <div className="auth">
          <h1>Login</h1>
          {error ? <div className="auth__error">{error}</div> : null}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
