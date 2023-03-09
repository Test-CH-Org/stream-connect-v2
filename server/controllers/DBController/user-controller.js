const router = require("express").Router();
const { User, SearchLog } = require("../../models");
const dayjs = require('dayjs');
const messages = require("../../utils/messages");


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

router.post("/login", async (req, res) => {

	var usr = await User.findOne({
		where: { email: req.body.email },
    })

    console.log(usr);
    
    if(!usr) {
        res
			.status(400)
			.json({ message: messages.userNotFound });
			return;
    }

	const validPassword = await usr.checkPassword(req.body.password);

    if (!validPassword) {
        //console.log("Invalid Password");
        usr.increment({ 'loginAttempts': 1 });
        usr.lastFailedLogin = dayjs().toString();


		if (usr.loginAttempts > 9) {
			
			usr.active = false;
		}
        else if (usr.loginAttempts > 3) {
            usr.lockedOut = true;
            await usr.save({ fields: ['lastFailedLogin','lockedOut'] });
            res
                .status(400)
                .json({ message: messages.lockedOut });
            return;
        }

        await usr.save({ fields: ['lastFailedLogin'] });
        res.status(400).json({ message: messages.invalidCreds });
			return;
    }
    else {
        //console.log("Valid Password");
		var now = dayjs()
//testing
		if (dayjs(usr.lastFailedLogin).diff(now, 'minutes') < -15) { //calculates the difference in reverse. So we are looking for 15 minutes have passed.
            usr.loginAttempts = 0;
            usr.lockedOut = false;
        }
		else if (usr.lockedOut) { //if they are still locked out

            res
                .status(400)
                .json({ message: messages.lockedOut });
            return;
        }
    }

    req.session.save(() => {
			req.session.user_id = usr.id;
			req.session.username = usr.email;
			req.session.loggedIn = true;

			res.json({ user: usr, message: messages.loginSuccess });
		});
        
});

router.post("/reset", async (req, res) => {//will need to consider the context of when this becomes available.
    var usr = await User.findOne({
        where: {email: req.body.email}
    })


	if (!usr) {
		res.status(400).json({message: messages.userNotFound});
	}

    const validPassword = await usr.checkPassword(req.body.password);

    if (validPassword) {
		usr.password = req.body.newPassword;
		usr.lockedOut = false;
		usr.loginAttempts = 0;
        usr.save();
        res.json({ message: messages.passwordReset });
        return;
    }

    res.status(400).json({ message: messages.invalidCreds });
})

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

//change password route

//update user information (like email)

module.exports = router;
