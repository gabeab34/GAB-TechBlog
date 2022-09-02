const router = require("express").Router();
const { User, Post } = require("../models/");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {

  let posts = await Post.findAll();

  console.log("post: ", posts)
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
});

router.get("/post/:id", async (req, res) => {
        await Post.findOne({
      where: { id: req.params.id}, attributes: ['id', 'postURL', 'postTitle', 'postDate'],
      include: [{ model: Comment }], attributes: ['id', 'comment', 'postId', 'userId', 'postDate'],
      include: [{ model: User }], attributes: ['username']
    })
    .then(data => {
        if (!data) {
            res.status(404).json({ message: 'There is no post with the associated id' });
            return;
        }
        const post =data.get({ plain: true});

        res.render('singlePost', {
            post,
            logged_in: req.session.loggedIn
        });
    })
    .catch (err => {
    res.status(500).json(err);
  })
});

// router.get("/event", (req, res) => {
//   res.render("event");
// });

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/dashboard", withAuth, (req, res) => {
  res.render("dashboard", {
    logged_in: req.session.logged_in,
  })
});

router.get("/", withAuth, (req, res) => {
  res.render("homepage", {
    logged_in: req.session.logged_in,
  })
});

module.exports = router;
