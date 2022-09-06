const router = require("express").Router();
const { User, Post, Comment } = require("../models/");
const withAuth = require("../utils/auth");

router.get('/', (req, res) => {
  Post.findAll({
          attributes: [
              'id',
              'postTitle',
              'postContents',
              'created_at'
          ],
          include: [{
                  model: Comment,
                  attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              },
              {
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(postData => {
          const posts = postData.map(post => post.get({ plain: true }));
          res.render('homepage', { posts, logged_in: req.session.logged_in });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

router.get('/posts/:id', (req, res) => {
  Post.findOne({
          where: {
              id: req.params.id
          },
          attributes: [
              'id',
              'postContents',
              'postTitle',
              'created_at'
          ],
          include: [{
                  model: Comment,
                  attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              },
              {
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(postData => {
          if (!postData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }
          const post = postData.get({ plain: true });
          console.log(post);
          res.render('single-post', { post, logged_in: req.session.logged_in });


      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});
router.get('/posts-comments', (req, res) => {
  Post.findOne({
          where: {
              id: req.params.id
          },
          attributes: [
              'id',
              'postContents',
              'postTitle',
              'created_at'
          ],
          include: [{
                  model: Comment,
                  attributes: ['id', 'comment', 'post_id', 'user_id', 'created_at'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              },
              {
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(postData => {
          if (!postData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }
          const post = postData.get({ plain: true });

          res.render('postComments', { post, logged_in: req.session.logged_in });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});



router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get('/login', (req, res) => {
  res.render('login');
});

// router.get('/dashboard', (req, res) => {
//   res.render('dashboard');
// });

router.get("/", withAuth, (req, res) => {
  res.render("homepage", {
    logged_in: req.session.logged_in,
  })
});


module.exports = router;
