import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../error.js"
import jwt from "jsonwebtoken"

// signup 
export const signup = async (req, res, next) => {

  try {

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const newUser = new User({ ...req.body, password: hash })

    await newUser.save()
    res.status(200).send("User has been created!")
  } catch (error) {
    next(error)
  }
}

// signin
export const signin = async (req, res, next) => {

  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return next(createError(404, "User Not Found!"))

    const isCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!isCorrect) return next(createError(400, "Wrong Credentials!"))

    // generate token for login user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)

    //get user info except for password
    const { password, ...userInfo } = user._doc

    // set token in cookie and return userInfo
    res.cookie("access_token", token, {
      httpOnly: true
    }).status(200)
      .json(userInfo)

  } catch (error) {
    next(error)
  }
}

// Google Login
export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};