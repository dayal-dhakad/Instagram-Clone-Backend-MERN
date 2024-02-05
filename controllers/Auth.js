const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//signup route handler
exports.signUp = async (req, res) => {
  try {
    //extract data from request body
    const { username, name, email, password } = req.body;

    //check if user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username already exists please try different username",
      });
    }

    //secure password
    let hashedPassword;

    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    //create entry for user
    const user = await User.create({
      username,
      name,
      email,
      password: hashedPassword,
    });

    //return successful response

    return res.status(200).json({
      success: true,
      message: "User created Successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again later",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    //validation on email and password
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill details carefully",
      });
    }

    const user = await User.findOne({ username });

    //check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const payload = {
      username: user.username,
      id: user._id,
    };

    //verify password and generate a JWT token
    if (await bcrypt.compare(password, user.password)) {
      //password matched

      //generate jwt token it takes payload  as parameters
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      // user = user.toObject();
      user.token = token;
      user.password = undefined; // password is removed from user object not from database

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //miliseconds
        httpOnly: true,
      };
      //  !name of cookie
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User logged in successfully",
      });
    } else {
      //password do not matched
      return res.status(402).json({
        success: false,
        message: "Password not matched",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};
