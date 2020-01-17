import jwt from "jsonwebtoken";
import Utils from "./Utils";

module.exports = function(accessLevel) {
  return function(req, res, next) {
    const token = req.headers["x-access-token"] || req.headers["authorization"];

    if (!token)
      return res.status(401).send("Access denied. No token provided.");

    try {
      const decoded = jwt.verify(token, Utils.getTokenSecret());
      req.user = decoded;
      if (accessLevel > req.user.role)
        return res.status(401).send("Access denied. Not enough permission.");
      next();
    } catch (ex) {
      res.status(400).send("Invalid token.");
    }
  };
};
