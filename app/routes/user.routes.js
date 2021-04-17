const { authJwt } = require("../middleware");
const userController = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/api/contacts/all", controller.allAccess);
  // [authJwt.verifyToken]
  app.post("/api/contact",userController.addContact);
  app.get("/api/contacts",userController.getAllContacts);

};
