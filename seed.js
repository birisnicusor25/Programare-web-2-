require("dotenv").config();
const mongoose = require("mongoose");

const User = require("./models/User");
const Team = require("./models/Team");
const Task = require("./models/Task");

async function seed(){
  await mongoose.connect(process.env.MONGO_URI);

  await User.deleteMany({});
  await Team.deleteMany({});
  await Task.deleteMany({});

  const user = await User.create({
    username:"test",
    email:"test@test.com",
    password:"123456"
  });

  await Team.create([
    {name:"Steaua", players:18, category:"Seniori", createdBy:user._id},
    {name:"Dinamo", players:20, category:"Seniori", createdBy:user._id}
  ]);

  await Task.create([
    {title:"Organizare meci", status:"pending", createdBy:user._id},
    {title:"Arbitru", status:"completed", createdBy:user._id}
  ]);

  console.log("SEED DONE");
  process.exit();
}

seed();