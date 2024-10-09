const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const bcrypt = require("bcrypt");

// POST / signup
router.post("/", async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      res
        .status(400)
        .json({ message: "Please provide a username and password" });
      return;
    }
    const existingUser = await User.findOne({
      where: { username: req.body.username },
    });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;
    const userData = await User.create(req.body);
    delete userData.password;

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST / login
router.post("/login", async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      res
        .status(400)
        .json({ message: "Please provide a username and password" });
      return;
    }
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      res.status(400).json({ message: "User does not exist" });
      return;
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect username or password" });
      return;
    }
    delete userData.password;
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in" });
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Error try again later" });
  }
});

// Route to log out a user
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    // Destroy the session
    req.session.destroy(() => {
      res.status(204).end(); // Send success response
    });
  } else {
    res.status(404).end(); // If user is not logged in, send 404
  }
});


module.exports = router;
