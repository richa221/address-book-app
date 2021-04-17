exports.getAllContacts = (req, res) => {
	// get firebase contacts
  res.status(200).send("User Content.");
};


exports.createContact = (req, res) => {
	// store conrtacts on firebase
	const {firstName, lastName, phoneNumber, address} = req.body
	console.log(req.body);
  res.status(200).send("User Content saved.");
};
