const router = require("express").Router();
const { User } = require("../models/");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render("homepage", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
        await Post.findOne({
      where: { id: req.params.id}, attributes: ['id', 'postURL', 'postTitle', 'postDate'],
      include: [{ model: Comment }], attributes: ['id', 'comment', 'postID', 'userID', 'postDate'],
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

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

router.get("/homepage", (req, res) => {
  res.render("homepage");
});

module.exports = router;
