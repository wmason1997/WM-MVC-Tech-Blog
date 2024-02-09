const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
        include: [
            {
                model: User,
                attributes: ['name'],
            },
        ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
        blogs,
        logged_in: req.session.logged_in
    });

    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            // include: [
            //     {
            //         model: User,
            //         attributes: ['id', 'name'],

                    
            //     },
            //     {
            //         model: Comment,
            //     }
            // ],
            include: [
                {
                    model: Comment,
                    include: User,
                },
            ],
        });

        const blog = blogData.get( { plain: true });
        console.log('Blog Data:', blog);
        res.render('blog', {
            blog,
            logged_in: req.session.logged_in,
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

// Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//     try {
//         // Find the logged in user based on the session ID
//         const userData = await Blog.findByPk(req.session.user_id,  {
//             attributes: { exclude: ['password'] },
//             include: [{ model: User }],
//         });

//         const blogs = userData.get({ plain: true });
    
//     console.log(blogs);
        
//         res.render('profile', {
//             layout: 'main',
//             blogs
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error);
//     }
// });

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        const user = userData.get({ plain: true });

        console.log("I am the user", user);

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login')
});

module.exports = router;