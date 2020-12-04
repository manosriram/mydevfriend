const express = require("express");
const router = express.Router();
const yup = require("yup");

// TODO:
// 1. Get body.
// 2. Validate it using YUM.
// 3. Check if username doesn't exist.
// 4. If not, create a row in user table and user_language table.

const signUpSchema = yup.object().shape({
    username: yup
        .string()
        .min(4, "Username must atleast be of length 4")
        .max(32, "Username should not exceed length 32"),
    password: yup
        .string()
        .min(4, "Password must atleast be of length 4")
        .max(32, "Password should not exceed length 32"),
    email: yup
        .string()
        .email("Email not in format")
        .required(),
    location: yup.string().required(),
    firstName: yup
        .string()
        .required()
        .max(32, "First Name should not exceed length 32"),
    lastName: yup
        .string()
        .required()
        .max(32, "Last Name should not exceed length 32"),
    dob: yup.string().required()
});

router.post("/signup", async (req, res) => {
    try {
        const {
            username,
            password,
            email,
            location,
            firstName,
            lastName,
            dob
        } = req.body.data;
        const validSchema = signUpSchema.validateSync({
            username,
            password,
            email,
            location,
            firstName,
            lastName,
            dob
        });

        console.log(validSchema);
        res.send("asdas");
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
