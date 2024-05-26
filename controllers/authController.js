const Auth = require("../models/userSchema");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    console.log("dfsdf");
    const { firstname, lastname, email, password } = req.body;
    //new
    const checkUserExisting = await Auth.findOne({ email });
    if (checkUserExisting) {
      return res.status(404).json({ message: "User is already Existing" });
    }
    //
    const hashedPassword = await bcryptjs.hash(password, 10);
    await Auth.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      // userImage:"https://xsgames.co/randomusers/assets/avatars/male/5.jpg"
    });

    return res.status(201).json({ status: "success" });
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "samaaaaaaaaaaa7",error });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const visitor = await Auth.findOne({ email });
    if (!visitor)
      return res.status(400).json({ message: "please signup first" });

    const comparePassowrd = await bcryptjs.compare(password, visitor.password);
    if (!comparePassowrd)
      return res.status(400).json({ message: "wrong Password" });
    const token = jwt.sign(
      {
        _id: visitor._id,
        email: visitor.email,
        firstname: visitor.firstname,
        lastname: visitor.lastname,
      },
      process.env.PRIVATE_KEY_TOKEN
    );
    return res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signup, login };