import { UnAuthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

// for every protected route
// to see if the request has valid token
const authenticateUser = async (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Failed");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(payload);
    // attach the user request object
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Failed");
  }
};

export default authenticateUser;
