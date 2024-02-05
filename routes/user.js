const express = require("express");
const router = express.Router();

const { login, signUp } = require("../controllers/Auth");
const { home } = require("../controllers/home");
const {
  auth,
  isStudent,
  isAdmin,
  verifyToken,
} = require("../middlewares/auth");
const { getProfile } = require("../controllers/getProfile");

router.get("/home", auth, (req, res) => {
  console.log("home api hit");
  // return res.status(200).json({
  //   success: true,
  //   message: "home api hit",
  // });
});

//protected routes
router.get("/protected/profile/:id", verifyToken, getProfile );

router.post("/login", login);
router.post("/signup", signUp);
router.get("/profile/:id", getProfile);

router.post('/verifyToken', verifyToken, (req, res) => {
  // If the middleware verifyToken passed, it means the token is valid
  res.status(200).json({ success: true, message: 'Token is valid.' });
});
//testing one middleware
router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected routes for test",
  });
});

//protected routes middlewares are used to for authorization which page can be accessed by whom
router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected routes for students",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the protected routes for Admin",
  });
});

module.exports = router;
