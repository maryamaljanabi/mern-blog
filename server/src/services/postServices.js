import mongoose from "mongoose";
import Post from "./../models/post";

//CRUD
//getAll
//getOne
//add
//update
//delete
export const getAllPosts = async () => {
  try {
    const res = await Post.find({});
    console(res);
  } catch (err) {
    console.log("Error getting all posts...", err);
    return err;
  }
};
