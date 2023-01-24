import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";

/*User Register*/
export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      username,
      password,
      avatar
    } = req.body;
      
    /*validate data*/
    if (!name || !email || !username || !password)
      return res.status(400).json({ msg: "Please fill in all fields!" });

    if (!validateEmail(email))
      return res.status(400).json({ msg: "Invalid email!" });

    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ msg: "This email already exists!" });
      
    const uname = await User.findOne({ username });
    if (uname)
      return res.status(400).json({ msg: "This username already exists!" });
    
    if (name.length < 4)
      return res
        .status(400)
        .json({ msg: "Name should long more than 4 characters" });
    
    if (name.length > 50)
      return res
        .status(400)
        .json({ msg: "Name should not long more than 50 characters" });
    
    if (username.length < 6)
      return res
        .status(400)
        .json({ msg: "Username should long more than 6 characters" });
    
    if (username.length > 15)
      return res
        .status(400)
        .json({ msg: "Username should not long more than 15 characters" });
      
    //validate password
    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: "Password must be at least 8 characters long!" });

    if (password.search(/[A-Z]/) < 0) return res
      .status(400)
      .json({ msg: "Password must have at least one uppercase letter!" });

    if (password.search(/[0-9]/) < 0) return res
      .status(400)
      .json({ msg: "Password must have at least one numeric value!" });


    const saltpwd = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, saltpwd);

    const newUser = new User({
      name,
      email,
      username,
      password: passwordHash,
      avatar
    });
    await newUser.save();
    res.status(201).json({msg: "Registration Successful!"});
  } catch (error) {
    res.status(500).json({error: error.message });
  }
};

function validateEmail(email) {
  const chkMail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return chkMail.test(email);
}
