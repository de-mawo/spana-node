import express from "express";
import passport from 'passport';

const router = express.Router();

// login
router.get('/login', (req, res) => {
    //
})


// logout
router.get('/logout', (req, res) => {
    //
})

//Google auth
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

router.get('/google/callback',passport.authenticate('google'), (req, res) => {
    res.send('Hi From Call Back')
})

export default router;
