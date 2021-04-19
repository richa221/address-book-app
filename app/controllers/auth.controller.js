'use strict'

const { db }= require("../models");
const config = require("../config/auth.config");
const User = db.user;
const {  Validator } = require('node-input-validator');

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

/**
 * Register user on application
 *
 * @param {String} email User email
 * @param {password} email User email
 * @return true or false
 */
exports.signup = async (req, res) => {

  const {email, password} = req.body;

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
  const user = await User.create({    
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  
  if (user) {
    res.status(200).send({ message: "User registered successfully!" });
  } else {
    res.status(400).send({ message: "Error! While registering user!" });
  }

};

/**
 * Signin user on application
 *
 * @param {String} email User email
 * @param {password} email User email
 * @return {userId, email, token}
 */
exports.signin = async (req, res) => {
  const {email, password} = req.body;

  const data = {email, password};

  const validate = new Validator(data, {
    email:"required", 
    password:"required"
  });

  let matched = await validate.check();
  if (!matched) {
    return res.status(400).json(validate.errors);
  }

  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user) {
    return res.status(400).send({ message: "User Not found." });
  }

  var passwordIsValid = await bcrypt.compareSync(
      req.body.password,
      user.password
    );

  if (!passwordIsValid) {
    return res.status(400).send({
      message: "Invalid login credentials!"
    });
  }

  var token = await jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400 // 24 hours
  });

  res.status(200).send({
    id: user.id,          
    email: user.email,          
    tokenType:"Bearer",
    accessToken: token,
  });

};
