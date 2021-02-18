import Post from "./../models/post";
import User from "./../models/user";

export const getAllPosts = async () => {
  return await Post.find({});
};

export const getOnePost = async (id) => {
  return await Post.findById(id);
};

export const addPost = async (post) => {
  //find user by name
  const user = await User.findOne({ userName: post.createdBy });
  post.createdBy = user._id;
  //add post
  return await Post.create(post);
};

export const updatePost = async (post) => {
  return await Post.findByIdAndUpdate(post.id, post);
};

export const deletePost = async (id) => {
  return await Post.findOneAndRemove({ _id: id });
};
