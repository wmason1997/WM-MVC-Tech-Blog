const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require ('../../utils/auth');

// Add Blog
router.post('/', withAuth, async (req, res) => {
    try {
        console.log("hello");
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        
        res.status(200).json(newBlog);
        console.log("goodbye");
    } catch (error) {
        res.status(400).json(error);
    }
});

// Delete blog
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(!blogData) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }
        
        res.status(200).json(blogData);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update specific blog
router.put('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.update({
            title: req.body.title,
            content: req.body.content,
        },
        {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        }
    );
        res.status(200).json(blogData);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Add comment on a specific blog
router.post('/:id/comment', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        console.log("right before status 200");
        res.status(200).json(newComment);
        console.log("right after status 200");
    } catch (error) {
        res.status(400).json(error);
    }
})


module.exports = router;