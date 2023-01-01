const jwt = require("jsonwebtoken");
const User = require("../models/User");
const JWT_SECRET = "@sf9#*@";

//this middleware send user data from database using jwt

const fetchUser = async (req, res, next) => {
	//returns as req.userData;
	//get user from jwt
	const token = req.headers.authtoken;

	if (!token) {
		return res.status(401).json({ msg: "No token, authorization denied" });
	}
	try {
		const data = jwt.verify(token, JWT_SECRET);
		const id = data;
		const userData = await User.findById(id);
		req.userData = userData;
		// console.log(req);
		next();
	} catch (error) {
		res.status(401).send(error);
	}
};

module.exports = fetchUser;
