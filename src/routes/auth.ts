import express from "express";
import passport from "passport";
import { COOKIE_NAME } from "../utils/constants";

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

router.get("/session", (req, res, next) => {
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
    next();
  }
});

// logout
router.delete("/logout", (req, res, next) => {
  // console.log("LOGGOUT ROUTE",req);
  // req.logout(function(err) {
  //   if (err) { return next(err); }
  //   res.clearCookie(COOKIE_NAME);
  //     res.status(200).send({ success: true });
  // });
  console.log(req.session);
  
  req.session.destroy((err) => {
  if (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, error: "An error occurred during logout" });
    return;
  }

  res.clearCookie(COOKIE_NAME);
  res.status(200).send({ success: true });
});
});

export default router;


