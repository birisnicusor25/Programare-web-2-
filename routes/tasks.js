const router = require("express").Router();
const Task = require("../models/Task");
const requireLogin = require("../middleware/requireLogin");

// PAGE
router.get("/tasks",requireLogin,(req,res)=>{
  res.render("tasks/index");
});

// REST
router.get("/api/tasks",requireLogin, async (req,res)=>{
  const status = req.query.status;
  const tasks = await Task.find({
    createdBy:req.session.user._id,
    ...(status ? {status} : {})
  });
  res.json(tasks);
});

module.exports = router;