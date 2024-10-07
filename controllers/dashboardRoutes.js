const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    const userData = await User.findByPk(req.session.user_id);
    const user = userData.get({ plain: true });
    const posts = postData.map((post) => post.get({ plain: true }));
    delete user.password;

    res.render("dashboard", {
      posts,
      user,
      loggedIn: req.session.logged_in,
      title: "Dashboard",
    });
  } catch (err) {
    res.redirect("login");
  }
});

router.get("/edit/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id);
        const post = postData.get({ plain: true });
    
        res.render("edit-post", {
        post,
        loggedIn: req.session.logged_in,
        title: "Edit Post",
        });
    } catch (err) {
        res.redirect("login");
    }
    });

router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    loggedIn: req.session.logged_in,
    title: "New Post",
  });
});

module.exports = router;
