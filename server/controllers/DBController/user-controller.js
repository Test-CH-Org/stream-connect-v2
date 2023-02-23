const router = require("express").Router();
const { User, SearchLog } = require("../../models");

//get all users, can add parameters to the req body
router.get("/", (req, res) => {
	User.findAll({
		attributes: { exclude: ["password"] },
	})
		.then((dbUserData) => res.status(200).json(dbUserData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

//create a new user/ sign up
router.post("/", (req, res) => {
	User.create({
		email: req.body.email,
		password: req.body.password,
	})
		.then((dbUserData) => {
			req.session.save(() => {
				req.session.user_id = dbUserData.id;
				req.session.email = dbUserData.email;
				req.session.loggedIn = true;
				res.json(dbUserData);
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});
router.post("/login", (req, res) => {
	User.findOne({
		where: { email: req.body.email },
	}).then((dbUserData) => {
		if (!dbUserData) {
			res
				.status(400)
				.json({ message: "could not find user with that email address" });
			return;
		}
		const validPassword = dbUserData.checkPassword(req.body.password);
		if (!validPassword) {
			res.status(400).json({ message: "Incorrect password" });
			return;
		}
		req.session.save(() => {
			req.session.user_id = dbUserData.id;
			req.session.username = dbUserData.username;
			req.session.loggedIn = true;

			res.json({ user: dbUserData, message: "login succesful" });
		});
	});
});

router.post("/logout", (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

//use this route for viewing user lists
router.get("/:id", (req, res) => {
	//if a user is looking at their own page, do not include purchase data
	if (req.params.id === req.session.user_id) {
		User.findOne({
			where: { id: req.session.user_id },
			include: [{ model: SearchLog }],
		})
			.then((data) => res.status(200).json(data))
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	} else {
		User.findOne({
			attributes: { exclude: ["password"] },
			where: { id: req.params.id },
			include: [{ model: SearchLog }],
		})
			.then((dbUserData) => {
				if (!dbUserData) {
					res.status(404).json({ message: "could not find user with this id" });
					return;
				}
				res.status(200).json(dbUserData);
			})
			.catch((err) => {
				console.log(err);
				res.status(500).json(err);
			});
	}
});

module.exports = router;
