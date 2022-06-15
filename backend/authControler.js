import User from "./models/user.js";
import Role from "./models/role.js";
import imgProduct from "./models/imgProduct.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import Secret from "./config.js";

const generateAccesToken = (email, roles) => {
  const payload = {
    email,
    roles,
  };
  return jwt.sign(payload, Secret.secret, { expiresIn: "240s" });
};

class authControler {
  async signUp(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "registration errors", errors });
      }

      const { email, password } = req.body;
      const condidate = await User.findOne({ email });
      if (condidate) {
        return res.status(400).json({ message: "User already exists" });
      }
      const heshPassword = bcrypt.hashSync(password, 7);
      req.body.password = heshPassword;
      const rolee = await Role.findOne({ value: "USER" });
      req.body.roles = rolee.value;
      const user = new User(req.body);
      const token = generateAccesToken(user.email, user.roles);
      await user.save();
      return res.json({ token });
    } catch (e) {
      console.log(e);
        res.status(400).json({
        message: "SignUp error",
      });
    }
  }
  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateAccesToken(user.email, user.roles);

        res.json({ token });
      } else {
        return res
          .status(401)
          .json({ message: `Account  ${email} is not found` });
      }
    } catch (e) {
      console.log(e);
    }
  }
  async getUsers(req, res) {
    try {
      const data = await User.find();
      return res.json(data);
    } catch (e) {
      console.log(e);
    }
  }

  async getToken(req, res) {
    try {
      const reqToken = req.headers.authorization.split(" ")[1];
      const decodeData = jwt.verify(reqToken, Secret.secret);
      const token = generateAccesToken(decodeData.email, decodeData.roles);
      res.json({ token });
    } catch (e) {
      console.log(e);
      return res.status(404).json({ message: "miban sxal es are" });
    }
  }

  async deleteUsers(req, res) {
    User.deleteOne(req.body)
      .then((data) => res.send(req.body))
      .catch((err) => res.send((req.statusCode = 500)));
  }

  async uplodProduction(req,res){
    try {
          const img = new imgProduct(req.body)
          await img.save()
          res.json('apranqatesak grancvac e ')
    } catch (error) {
      res.status(500).json('mi ban sxal es are nayi tokent kam uxarkac body in ')
    }
  }

  async getProducts(req,res){
      try {
       const data = await imgProduct.find()
       res.json(data)
      } catch (e) {
        res.status(500).json('mi ban sxal es arel nayi tokent')
      }
  }
 
  async adminSignin(req,res){
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateAccesToken(user.email, user.roles);
        res.json(true);
      } else {
        return res
          .status(401)
          .json({ message: `Account  ${email} is not found` });
      }
    } catch (e) {
      console.log(e);
    }
  }




}

export default new authControler();
