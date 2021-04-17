const {	Validator } = require('node-input-validator');
const { firebaseDB } = require("../models");

exports.getAllContacts = (req, res) => {
	// get firebase contacts
	var ref = firebaseDB.ref('/');
	ref.on("value", function(snapshot) {
		res.status(200).send({ data:snapshot.val() });
	  }, function (errorObject) {
		res.status(400).send({ error:errorObject.code });
	});
};


exports.addContact = async (req, res) => {
	// store contact on firebase
	const {firstName, lastName, phoneNumber, address} = req.body
	const data = {firstName,lastName,phoneNumber,address};
	const validate = new Validator(data, {
		firstName:"required", 
		lastName:"required", 
		phoneNumber:"required", 
		address:"required"
	});
	let matched = await validate.check();
	if (!matched) {
		return res.status(400).json(validate.errors);
	}
	firebaseDB.ref(`strv-addressbook-${data.lastName.toLowerCase()}-${data.firstName.toLowerCase()}`).set(data);
  	res.status(200).send({msg:"User Contact saved successfully."});
};
