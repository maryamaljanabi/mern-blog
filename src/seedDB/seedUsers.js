import path from "path";
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
import User from "./../models/user";
import mongoose from "mongoose";
import connectDB from "./../db/dbConfig";

connectDB();
(async function seedDB() {
  async function seedUser(userName, email, password, summary, imagePath) {
    try {
      const user = await new User({
        userName,
        email,
        password,
        summary,
        imagePath: imagePath,
      });
      await user.save(function (err) {
        if (err) {
          console.log(err);
          return;
        }
      });
      console.log("User added succefully!");
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function closeDB() {
    console.log("CLOSING CONNECTION");
    await mongoose.disconnect();
  }

  await seedUser(
    "newName",
    "test@test.com",
    "000",
    "some test user!",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1027&q=80"
  );
  await seedUser(
    "testName",
    "test@test.com",
    "000",
    "some test user!",
    "https://images.unsplash.com/photo-1511694009171-3cdddf4484ff?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
  );
  await closeDB();
})();
