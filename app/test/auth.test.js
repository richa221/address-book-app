const { chai, server, should, chaiHttp } = require("./testConfiguration");
const UserModel = require("../models/user.model");

/**
 * Test cases to test all the authentication APIs
 * Covered Routes:
 * (1) Login
 * (2) Register
 */

describe("Auth", () => {
 	

	// Prepare data for testing
	const testData = {		
		"password":"Test@123",
		"email":"richatyagi1987@test12345.com"
	};

	/*
	* Test the /POST route
	*/
	describe("/POST Register", () => {
		it("It should send validation error for Register", (done) => {			
			chai.request(server)
				.post("/api/auth/signup")
				.send({"email": testData.email})
				.end((err, res) => {
					res.should.have.status(400);
					done();
				});
		});
	});

	/*
	* Test the /POST route
	*/
	describe("/POST Register", () => {
		it("It should Register user", (done) => {
			chai.use(chaiHttp);
			chai.request(server)
				.post("/api/auth/signup")
				.send(testData)
				.end((err, res) => {					
					// res.should.have.status(200);					
					done();
				}).timeout(20000);
		});
	});

	/*
	* Test the /POST route
	*/
	describe("/POST Login", () => {
		it("It should send validation error for Login", (done) => {
			chai.request(server)
				.post("/api/auth/sigin")
				.send({"email": testData.email})
				.end((err, res) => {
					res.should.have.status(404);
					done();
				});
		});
	});

	
	// * Test the /POST route
	
	describe("/POST Login", () => {
		it("it should Send failed user Login", (done) => {
			chai.request(server)
				.post("/api/auth/sigin")
				.send({"email": "admin@admin.com","password": "1234"})
				.end((err, res) => {
					res.should.have.status(404);
					done();
				});
		});
	});

});