import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Please login!");
    }

    if (token.startsWith("Bearer ")) {
       token = token.slice(7, token.length).trimLeft();
      }
      
    const loggedIn = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = loggedIn;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
