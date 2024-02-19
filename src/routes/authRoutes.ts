import express from "express";
import passport from "passport";

type User = {
  name: string;
  email: string;
  role: string;
  image: string;
};

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
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google",{session: true}),
  (req, res, next) => {
   
      res.redirect(`http://localhost:3000/dashboard`);
   
  }
);

router.get("/session", (req, res) => {

  console.log(req.headers);
  
  try {
    if (req.user) {
      res.send({
        success: true,
        user: req.user,
      });
     
   
      
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


export default router;
