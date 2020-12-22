const chai = require("chai");
const chaiHttp = require("chai-http");
var assert = require("assert");
const app = require("../server");
const Database = require("../Controllers/Query");

chai.should();
chai.use(chaiHttp);

const fakeUser = {
    firstName: "updatedFakeUserFirstName",
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

// Tests by creating a new user.
describe("Chat Module Tests", () => {
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

    describe("/chat/connections", () => {
        it("should return a list of connections of logged-in user with a status code of 200", done => {
            chai.request(app)
                .get("/chat/connections")
                .set("authorization", `Bearer ${token}`)
                .end((err, res) => {
                    chai.assert.isArray(
                        res.body.friends,
                        "User details not an array"
                    );
                    res.should.have.status(200);
                    done();
                });
        });
    });
});

after(() => {
    connection
        .query("delete from user where username = ?", fakeUser.username)
        .then(
            rows => {
                console.log("Cleaned Test DB details");
            },
            err => {
                console.log(err);
            }
        );
});
