import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import axios from "axios";
/*User Register*/
export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      username,
      password,
      avatar,
      captcha
    } = req.body;
    const captcha_KEY = process.env.captcha_KEY;
             
    /*validate data*/
    if (!name || !email || !username || !password)
      return res.status(400).json({ msg: "Please fill in all fields!" });

    if (!validateEmail(email))
      return res.status(400).json({ msg: "Invalid email!" });
    
    if (!captcha)
      return res.status(400).json({ msg: "Please verify captcha!" });

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
    console.log("PPADWP" + captcha);
    
    //validate captcha
    await axios(
      {
       url:`https://www.google.com/recaptcha/api/siteverify?secret=${captcha_KEY}&response=${captcha}`,
       method: 'POST',
      }).then(async({data}) => {
         console.log(data);
        if (data.success) {
        const newUser = new User({
           name,
           email,
           username,
           password: passwordHash,
           avatar
    });
         const saveduser =await newUser.save();
         res.status(201).json({msg: "Registration Successful!"});
        }
      }
      ).catch((err) => {
        console.log(err);
      });
    
  } catch (error) {
    res.status(500).json({error: error.message });
  }
};

function validateEmail(email) {
  const chkMail =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return chkMail.test(email);
}

export const login = async (req, res) => {
  try {
    const { emailOrusername, password, captcha } = req.body;
    const captcha_KEY = process.env.captcha_KEY;
    let user = await User.findOne({ email: emailOrusername});

    //Check if email or username exists
    if (!user) {
      user = await User.findOne({ username: emailOrusername });
      if (!user) {
        return res.status(400).json({ msg: "Email or username does not exist!" });
      }
    }
    //Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Incorrect Passowrd! " });
    
     if (!captcha)
      return res.status(400).json({ msg: "Please verify captcha!" });

    
    //validate captcha
    await axios(
      {
       url:`https://www.google.com/recaptcha/api/siteverify?secret=${captcha_KEY}&response=${captcha}`,
       method: 'POST',
      }).then(async({data}) => {
         console.log(data);
        if (data.success) {
          const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
          res.status(200).json({ msg: "Login success! ", token, user });
        }
      }
    ).catch((err) => {
      console.log(err);
    }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
