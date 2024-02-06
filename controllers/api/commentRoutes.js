const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            // maybe add the date_created if you find you need it
        });

        res.status(200).json(newComment);
    } catch (error) {
        res.status(400).json(error);
    }
});

// update comment
router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(commentData);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;