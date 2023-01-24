import User from "../models/userModel.js";

export const getUser = async (req, res) => {
  try {
      const user = await User.findOne({ email: req.params.email,}).select("-password");    
       res.json(user);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
};