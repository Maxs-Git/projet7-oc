const jwt = require("jsonwebtoken");
require("dotenv").config();

console.log(process.env.REACT_APP_API_TOKEN);
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.REACT_APP_SECRET_TOKEN);
    const userId = decodedToken.userId;
    const roleAdmin = decodedToken.role;
    req.auth = {
      userId: userId,
      isAdmin: roleAdmin,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
