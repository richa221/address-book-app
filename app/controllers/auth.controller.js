const { db }= require("../models");
const config = require("../config/auth.config");
const User = db.user;
const {  Validator } = require('node-input-validator');

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const {email, password} = req.body
  const data = {email, password};
  const validate = new Validator(data, {
    email:"required", 
    password:"required"
  });

  let matched = await validate.check();
  if (!matched) {
    return res.status(500).json(validate.errors);
  }
  // Save User to Database
  User.create({    
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      res.send({ message: "User registered successfully!" });
    })
    .catch(err => {
      res.status(400).send({ message: err.message });
    });
};

exports.signin = async (req, res) => {
  const {email, password} = req.body
  const data = {email, password};
  const validate = new Validator(data, {
    email:"required", 
    password:"required"
  });

  let matched = await validate.check();
  if (!matched) {
    return res.status(400).json(validate.errors);
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

       res.status(200).send({
          id: user.id,          
          email: user.email,          
          tokenType:"Bearer",
          accessToken: token,
        });

    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
