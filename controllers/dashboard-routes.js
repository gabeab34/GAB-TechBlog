const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { Post, User, Comment } = require('../models');

router.get('/', withAuth, (req, res) => {
  Post.findAll({
      where: {
        username: req.session.username
      },
      attributes: [
        'id',
        'postURL',
        'postTitle',
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment', 'postID', 'userID'],
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
        res.render('dashboard', { posts, loggedIn: true });
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
    attributes: ['id', 'postURL', 'postTitle' ],
    include: [
        {
            model: Comment,
            attributes: [
                'id',
                'comment',
                'userID',
                'postID',
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
          loggedIn: true
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