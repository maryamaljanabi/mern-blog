import path from "path";
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
import Post from "./../models/post";
import User from "./../models/user";
import mongoose from "mongoose";
import connectDB from "./../db/dbConfig";

connectDB();

(async function seedDB() {
  async function seedPost(title, content, imagePath, userName) {
    try {
      const user = await User.findOne({ userName: userName });
      const post = await new Post({
        title: title,
        content: content,
        imagePath: imagePath,
        createdBy: user._id,
      });
      await post.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function closeDB() {
    console.log("CLOSING CONNECTION");
    await mongoose.disconnect();
  }

  await seedPost(
    "A test post",
    "Just some random seed post",
    "https://cdn.pixabay.com/photo/2016/11/02/17/38/japan-1792369_1280.jpg",
    "newName"
  );
  await seedPost(
    "Lorem ipsum dolor sit amet",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lacinia magna sit amet eros finibus tempus a at nisi. Maecenas sagittis dapibus turpis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas vel diam eget eros interdum pellentesque eget in neque. Nulla ac porttitor ligula. Duis et mollis metus. Vestibulum congue, sapien vel convallis consectetur, ex diam porta nisl, non molestie ipsum massa eget ante. Duis ut nibh mi.",
    "https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80",
    "testName"
  );

  await closeDB();
})();
