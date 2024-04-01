import express from "express";
import passport from "passport";

type User = {
  name: string;
  email: string;
  role: string;
  image: string;
};

const router = express.Router();



//Google auth
router.get(
  "/authorize/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: true }),
  (req, res, next) => {
    res.redirect(process.env.CLIENT_URL as string);
  }
);

router.get("/session", (req, res) => {
  try {
    if (req.user) {
      const { name, email, image, role } = req.user as User; // Do not send the id in a production app
      const LoggedInUser = { name, email, image, role };
      res.json(LoggedInUser);
    } else {
      // Handle the case where req.user is undefined
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    console.log(error);

    res.status(500).json({ error: "Internal server error" });
  }
});

// logout
router.post("/logout", (req, res, next) => {
  console.log(req);
  req.logout((err) => {

    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      // destroys the session
      res.send();
    });
    res.redirect(process.env.CLIENT_URL as string);
  });
});

export default router;
