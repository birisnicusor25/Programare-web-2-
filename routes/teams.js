const router = require("express").Router();
const Team = require("../models/Team");
const requireLogin = require("../middleware/requireLogin");

router.get("/",requireLogin, async (req,res)=>{
  const teams = await Team.find().populate("createdBy");
  res.render("teams/index",{teams});
});

router.get("/new",requireLogin,(req,res)=>{
  res.render("teams/new");
});

router.post("/new",requireLogin, async (req,res)=>{
  await Team.create({...req.body, createdBy:req.session.user._id});
  res.redirect("/teams");
});

router.get("/:id",requireLogin, async (req,res)=>{
  const team = await Team.findById(req.params.id).populate("createdBy");
  res.render("teams/show",{team});
});

module.exports = router;