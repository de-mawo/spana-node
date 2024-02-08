import express from "express";
import passport from "passport";

const router = express.Router();

// login
router.get("/login", (req, res) => {
  //
});

// logout
router.get("/logout", (req, res) => {
  //
});

//Google auth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google"),
  (req, res, next) => {
    if (!req.user) {
      // Handle case where user is not authenticated
      return res.status(401).send("User not authenticated");
    }

    req.logIn(req.user, function (err) {
      if (err) {
        return next(err);
      }
      res.redirect(`http://localhost:3000/dashboard`)
    });
  }
);

export default router;
