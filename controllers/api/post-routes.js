const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post, User, Comment } = require('../../models');

router.post('/', withAuth, (req, res) => {
    Post.create({
        postTitle: req.body.postTitle,
        postContents: req.body.postContents,
        user_id: req.session.user_id
        })
        .then(postData => res.json(postData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'postTitle', 
            'postContents', 
            'created_at'
                    
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment',
                    'post_id',
                    'user_id',
                    'created_at'
                    
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
            const posts = postData.map(post => post.get({ plain: true }));
            res.render('dashboard', { posts, logged_in: true });
        })    
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
})

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'postContents', 'postTitle'],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment',
                    'post_id',
                    'user_id',
                    
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
            if (!postData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(postData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})



router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
        
    )
    .then(postData => {
        if (!postData[0]) {
          res.status(404).json({ message: 'There is no post with the associated id' });
          return;
        }
        res.json(postData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(postData => {
            if (!postData) {
                res.status(404).json({ message: 'There is no post with the associated id' });
                return;
            }
            res.json(postData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;