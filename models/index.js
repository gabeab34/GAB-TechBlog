const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');

User.hasMany(Post, {
    foreignKey: 'userID'
});
Post.belongsTo(User, {
    foreignKey: 'userID',
});
Comment.belongsTo(User, {
    foreignKey: 'userID'
});
User.hasMany(Comment, {
    foreignKey: 'userID'
});
Comment.belongsTo(Post, {
    foreignKey: 'postID'
});
Post.hasMany(Comment, {
    foreignKey: 'postID'
})

module.exports = { User, Post, Comment };