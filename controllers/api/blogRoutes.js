const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require ('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        console.log("hello");
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.json(newBlog);
        console.log("goodbye");
    } catch (error) {
        res.status(400).json(error);
    }
});

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
})

module.exports = router;