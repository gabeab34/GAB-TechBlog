const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

router.get('/new', (req, res) => {
  res.render('new-post');
});

router.get('/', withAuth, (req, res) => {
  console.log('hi')
  Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'postTitle',
        'postContents',
        'created_at'
        
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment', 'post_id', 'user_id'],
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
        console.log("Data: ", posts)
        res.render('dashboard', { posts, logged_in: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id, {
    where: {
        id: req.params.id
    },
    attributes: ['id', 'postContents', 'postTitle' ],
    include: [
        {
            model: Comment,
            attributes: [
                'id',
                'comment',
                'user_id',
                'post_id',
            ],
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
      if (postData) {
        const post = postData.get({ plain: true });
        
        res.render('edit-post', {
          post,
          logged_in: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;