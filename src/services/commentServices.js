import Post from "./../models/post";
import User from "./../models/user";
import Comment from "./../models/comment";

export const addComment = async (comment) => {
  //comment {content, createdBy, postId}

  //find required post
  const foundPost = await Post.findById(comment.postId);
  //create the comment
  const createdComment = await Comment.create(comment);
  //add the created comment to the found post
  await foundPost.comments.push(createdComment);
  const updatedPost = await foundPost.save();
  return updatedPost;
};

export const updateComment = async (comment) => {
  //comment {content, createdBy(id), postId, commentId}
  console.log(comment);
  const updatedComment = await Comment.findByIdAndUpdate(comment._id, comment);
  console.log(updatedComment);
  return updatedComment;
};

export const deleteComment = async (id) => {
  const deletedComment = await Comment.findByIdAndRemove({ _id: id });
  console.log(deletedComment);
  return deletedComment;
};
