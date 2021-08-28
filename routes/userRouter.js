const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

// read all users (for admin only)
router.get("/", verify, async (req, res) => {
	if (req.user.isAdmin) {
		try {
			const users = await User.find();
			res.status(200).json(users);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You are not allowed to see all users!");
	}
});

// read 1 user by Id
router.get("/:userId", async (req, res) => {
	try {
		const user = await User.findById(req.params.userId);
		const { password, ...info } = user._doc;
		res.status(200).json(info);
	} catch (err) {
		res.status(500).json(err);
	}
});

// update 1 user by Id (for admin or owner)
router.put("/:userId", verify, async (req, res) => {
	if (req.user.userId === req.params.userId || req.user.isAdmin) {
		if (req.body.password) {
			req.body.password = CryptoJS.AES.encrypt(
				req.body.password,
				process.env.SECRET_KEY
			).toString();
		}

		try {
			const updatedUser = await User.findByIdAndUpdate(
				req.params.userId,
				{
					$set: req.body,
				},
				{ new: true }
			);
			res.status(200).json(updatedUser);
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You can only update your account!");
	}
});

// delete 1 user by Id (for admin or owner)
router.delete("/:userId", verify, async (req, res) => {
	if (req.user.userId === req.params.userId || req.user.isAdmin) {
		try {
			await User.findByIdAndDelete(req.params.userId);
			res.status(200).json("User has been deleted...");
		} catch (err) {
			res.status(500).json(err);
		}
	} else {
		res.status(403).json("You can only delete your account!");
	}
});

module.exports = router;
