// authmiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const resp = await User.findById(decodedToken.userId).select(
        "isAdmin isManager isDeveloper email role"
      );

      req.user = {
        email: resp.email,
        isAdmin: resp.isAdmin,
        isManager: resp.isManager,
        isDeveloper: resp.isDeveloper,
        role: resp.role,
        userId: decodedToken.userId,
      };

      next();
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Not authorized. Try login again." });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ status: false, message: "Not authorized. Try login again." });
  }
};

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token

  if (token) {
    try {
      const decoded = jwt.verify(token, "yourSecretKey"); // Replace 'yourSecretKey' with your actual secret
      req.userId = decoded.id;
      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};

const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try login as admin.",
    });
  }
};

const isManagerRoute = (req, res, next) => {
  if (req.user && req.user.isManager) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as manager. Try login as manager.",
    });
  }
};

const isDeveloperRoute = (req, res, next) => {
  if (req.user && req.user.isDeveloper) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as developer. Try login as developer.",
    });
  }
};

export { protectRoute, isAdminRoute, isManagerRoute, isDeveloperRoute };
