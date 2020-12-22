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
    database: "foundbug"
};
const connection = new Database(mysqlConfig);

var token = "";
describe("User tests", () => {
    // Login to get token before all tests.
    before(() => {
        chai.request(app)
            .post("/auth/login")
            .send({
                data: {
                    username: fakeUser.username,
                    password: fakeUser.password
                }
            })
            .end((err, res) => {
                token = res.body.token;
                res.should.have.status(200);
            });
    });

    // Get user with given username.
    describe("/user/:username", () => {
        it("should return user details with status 200", done => {
            chai.request(app)
                .get(`/user/${fakeUser.username}`)
                .set("authorization", `Bearer ${token}`)
                .end((err, res) => {
                    assert.equal(res.body.success, true);
                    done();
                });
        });
    });

    // Get logged-in user's profile.
    describe("/user/profile", () => {
        it("should update logged-in user's profile with status 200 ", done => {
            const newFakeUserFirstName = "updatedFakeUserFirstName";
            chai.request(app)
                .put("/user/profile")
                .set("authorization", `Bearer ${token}`)
                .send({
                    data: {
                        firstName: newFakeUserFirstName,
                        lastName: fakeUser.lastName,
                        location: fakeUser.location,
                        username: fakeUser.username,
                        gender: fakeUser.gender,
                        email: fakeUser.email
                    }
                })
                .end((err, res) => {
                    assert.equal(res.body.user.firstName, newFakeUserFirstName);
                    res.should.have.status(200);
                    done();
                });
        });
    });

    // Get all users.
    describe("/user/all", () => {
        it("should return all users with status 200", done => {
            chai.request(app)
                .post("/user/all")
                .send({
                    currentPage: 0
                })
                .end((err, res) => {
                    chai.assert.isArray(
                        res.body.users,
                        "User details not an array"
                    );
                    res.should.have.status(200);
                    done();
                });
        });
    });
});
