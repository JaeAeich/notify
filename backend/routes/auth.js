const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const fetchUser = require("../middleware/fetchUser");

//json web token sercret key
const JWT_SECRET = "@sf9#*@";
//express validator is used to validate the inputs in the response field
const { body, validationResult } = require("express-validator");

//Route 1: create a user using :POST ("/api/auth/createUser") .(auth not reqiuired)
router.post(
	"/createUser",
	[
		// username must be an email
		body("email").isEmail(),
		// password must be at least 5 chars long
		body("password").isLength({ min: 5 }),
	],
	async (req, res) => {
		// Finds the validation errors in this request and wraps them in an object with handy functions
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const user = await User.findOne({ email: req.body.email });

		if (user) {
			return res
				.status(400)
				.send("User email already registered,try another email.");
		}
		const salt = await bcrypt.genSalt(10);
		secPass = await bcrypt.hash(req.body.password, salt);

		try {
			const newUser = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: secPass,
			});
			const authToken = jwt.sign(newUser.id, JWT_SECRET);
			res.json({ authToken });
		} catch (e) {
			console.log(error);
			res.send("some error occured!");
		}
	}
);

//Route 2: Login :POST ("/api/auth/login") .(auth not reqiuired)
router.post(
	"/login",
	body("email", "enter valid password").isEmail(),
	body("password", "password cant be left blank").exists(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			// Finds the validation errors in this request and wraps them in an object with handy functions

			const { email, password } = await req.body;

			//finding the user with the email
			const user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ err: "user nahin hai", email });
			}

			const passCheck = await bcrypt.compare(password, user.password);

			if (!passCheck) {
				return res.status(400).send("password galat hai kutte");
			}
			return res.json({ authToken: jwt.sign(user.id, JWT_SECRET) });
		} catch (e) {
			console.log(e);
			return res.send("bro error aa gya");
		}
	}
);

//Route 3: getInfo :POST ("/api/auth/getInfo") .(auth reqiuired)
router.post("/getInfo", fetchUser, (req, res) => {
	// res.send(req);
	res.send(req.userData);
});

module.exports = router;
