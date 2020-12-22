const chai = require("chai");
const chaiHttp = require("chai-http");
var assert = require("assert");
const app = require("../server");
const Database = require("../Controllers/Query");

chai.should();
chai.use(chaiHttp);

const fakeUser = {
    firstName: "Fake First Name",
    lastName: "Fake Last Name",
    username: "fakeusername",
    password: "fakepassword",
    email: "fakeemail@fake.com",
    location: "fakelocation",
    dob: "2020-12-30",
    bio: "Fake bio for testing",
    gender: "Male"
};

const mysqlConfig = {
    host: "localhost",
    user: "root",
    password: "password",
    database: "codealone"
};
const connection = new Database(mysqlConfig);

// Tests by creating a new user.
describe("/auth/signup/", () => {
    it("should create a new user and return status 201", done => {
        chai.request(app)
            .post("/auth/signup")
            .send({
                data: {
                    firstName: fakeUser.firstName,
                    lastName: fakeUser.lastName,
                    username: fakeUser.username,
                    password: fakeUser.password,
                    email: fakeUser.email,
                    location: fakeUser.location,
                    dob: fakeUser.dob,
                    bio: fakeUser.bio,
                    gender: fakeUser.gender
                }
            })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
});
