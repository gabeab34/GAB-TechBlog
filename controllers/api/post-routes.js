const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Post, User, Comment } = require('../../models');

router.post('/dashboard', withAuth, (req, res) => {
    Post.create({
        postTitle: req.body.postTitle,
        postContents: req.body.postContents,
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
            'postContents', 
            'postTitle'         
        ],
        include: [
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment',
                    'postId',
                    'userId',
                    
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
        .then(postData => res.json(postData))
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
                    'postId',
                    'userId',
                    
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