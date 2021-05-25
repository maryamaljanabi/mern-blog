import Post from "./../models/post";
import User from "./../models/user";

export const getAllPosts = async () => {
  return await Post.find({});
};

export const getOnePost = async (id) => {
  //find post
  const post = await Post.findById(id).populate({
    path: "comments",
    populate: {
      path: "createdBy",
    },
  });

  let res;
  if (post) {
    //get the name of the creator
    const user = await User.findById(post.createdBy);
    res = {
      ...post.toObject(),
      createdByName: user.userName,
      userImageUrl: user.imagePath,
    };
  }
  return res;
};

export const getPostByUserID = async (userId) => {
  return await Post.find({ createdBy: userId });
};

export const addPost = async (post) => {
  //add post
  return await Post.create(post);
};

export const updatePost = async (post) => {
  return await Post.findByIdAndUpdate(post._id, post);
};

export const deletePost = async (id) => {
  return await Post.findOneAndRemove({ _id: id });
};
