const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    if (!req.body.title || !req.body.content) {
      res.status(400).json({ message: "Please provide a title and content" });
      return;
    }
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deleted = Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ message: "Failed to delete post" });
  }
});

router.post("/:id/comments", withAuth, async (req, res) => {
  try {
    if (!req.body.body) {
      res.status(400).json({ message: "Please provide a comment" });
      return;
    }
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.params.id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
