import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { signUp, signingOut } from "../utils/firebase";
import AuthContext from "../AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import "./forms.css";
const Register = () => {
  const { user } = useContext(AuthContext);
  // const [user, setUser] = useState(null);
  console.log("inregister", user);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const name = "ico";

  // useEffect(() => {
  //   setUser(useContext(AuthContext));
  // });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === "") {
      seterror("Passwords do not match");
    } else {
      setEmail("");
      setPassword("");
      const res = await signUp(email, password, name);

      if (res.error) seterror(res.error);
    }
  };
  if (!user) {
    return <Navigate replace to="/login" />;
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
          <h1>Register New User</h1>
          {error ? <div className="auth__error">{error}</div> : null}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Your Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Your Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
          <span>
            Already have an account?
            <Link to="/login">login</Link>
          </span>
          <button onClick={() => signingOut()}>Submit</button>
        </div>
      </div>
    </>
  );
};
export default Register;