const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/register", (req,res)=>res.render("register"));
router.post("/register", async (req,res)=>{
  const user = await User.create(req.body);
  req.session.user = user;
  res.redirect("/teams");
});

router.get("/login", (req,res)=>res.render("login"));
router.post("/login", async (req,res)=>{
  const user = await User.findOne({email:req.body.email});
  if(!user) return res.send("eroare");

  const ok = await bcrypt.compare(req.body.password,user.password);
  if(!ok) return res.send("eroare");

  req.session.user = user;
  res.redirect("/teams");
});

router.get("/logout",(req,res)=>{
  req.session.destroy(()=>res.redirect("/"));
});

module.exports = router;