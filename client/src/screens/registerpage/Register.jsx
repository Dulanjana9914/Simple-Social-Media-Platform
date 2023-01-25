import "../../CSS/userFunction.css";
import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../../utils/notification/Notification";
import { isEmpty, isEmail, isLength,isMatch } from "../../utils/validation/Validation.js";
import PasswordChecklist from "react-password-checklist";
import {
  Box,
  TextField,
  useMediaQuery,
} from "@mui/material";

const initialState = {
  name: "",
  email: "",
  username: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};
 
function Register() {
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();
   
  const { name, email, username, password, cf_password, err, success } =
    user;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validations
    if (
      isEmpty(name) ||
      isEmpty(email) ||
      isEmpty(username) ||
      isEmpty(password)
    )
      return setUser({
        ...user,
        err: "Please fill in all fields!",
        success: "",
      });

    if (!isEmail(email))
      return setUser({ ...user, err: "Invalid email type!", success: "" });

    if (isLength(password))
      return setUser({
        ...user,
        err: "Password must have at least 8 characters!",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setUser({ ...user, err: "Password and confirm password not matched!", success: "" });
    try {
       await axios.post("http://localhost:8070/auth/register", {
        name,
        email,
        username,
        password
      }).then((res) => {
       navigate("/");
       setUser({ ...user, err: "", success: res.data.msg });
      });
    
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div>
        <h1 className="Hfontreg">SIGNUP HERE</h1>
        <div>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          <br></br>

        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
           ></Box>
          <label className="t-form-label2">* </label>
          <label className="t-form-label">Name </label>
            <TextField 
                type="text"
                className="inp-fields"
                id="name"
                placeholder="Enter Name"
                value={name}
                name="name"
                onChange={handleChangeInput}
                required
             />
              <br></br><br></br>
               <label className="t-form-label2">* </label>
               <label className="t-form-label">Email </label>
            <TextField
                type="email"
                className="inp-fields"
                id="email"
                placeholder="Enter Email"
                value={email}
                name="email"
                onChange={handleChangeInput}
                required
          />
          <br></br><br></br>
              <label className="t-form-label2">* </label>
              <label className="t-form-label">Username </label>
              <TextField
                type="text"
                className="inp-fields"
                id="username"
                placeholder="Enter unique username "
                value={username}
                name="username"
                onChange={handleChangeInput}
                required
              />
            
              <br></br><br></br>
                <label className="t-form-label2">* </label>
                <label className="t-form-label">Password </label>
              <TextField
                type="password"
                className="inp-fields"
                id="password"
                placeholder="Enter Password"
                value={password}
                name="password"
                onChange={handleChangeInput}
                required
              />
          
            <div className="pwd-checklist">
              <PasswordChecklist
                rules={["minLength", "number", "capital"]}
                minLength={8}
                value={password}
                messages={{
                  minLength: "At least 8 characters.",
                  number: "Minimum One Numeric Value.",
                  capital: "Minimum One Uppercase Letter.",
                }}
              />
              <p>
                Your password must contain at least one numeric value and
                <br></br>one uppercase letter with minimum 8 characters.
                </p>
               </div>

                <label className="t-form-label2">* </label>
                <label className="t-form-label">Confirm Password </label>
              <TextField
                type="password"
                className="inp-fields"
                id="cf_password"
                placeholder="Confirm Password"
                value={cf_password}
                name="cf_password"
                onChange={handleChangeInput}
                required
              />
           <p></p>
            <label className="t-form-label3">
              All fields with * are required.
            </label>{" "}
            <br></br> <br></br>
            <button
              type="submit"
              className="btn-register"
              style={{
                width: "140px",
                fontWeight: "bold",
                borderRadius: "12px",
              }}
            >
              Register
            </button>
        </form>
        <br></br> <br></br>
         &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
        <Link to="/" style={{
          textDecoration: `underline`, textAlign: `center`,
          fontStyle: `italic`, color: `#6b5c06`, fontSize: `20px`, fontWeight: `bold`
        }}>
         
          Already Have an Account? Login Here...
        </Link>
        </div>
      </div>
  );
}
export default Register;
