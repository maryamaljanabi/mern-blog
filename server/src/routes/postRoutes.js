import express from "express";
import {
  getAllPosts,
  getOnePost,
  addPost,
  updatePost,
  deletePost,
  getPostByUserID,
} from "../services/postServices";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.send(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.toString() });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await getOnePost(req.params.id);
    res.send(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.toString() });
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const result = await getPostByUserID(req.params.id);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.toString() });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await addPost(req.body.post);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.toString() });
  }
});

router.put("/", async (req, res) => {
  try {
    const result = await updatePost(req.body.post);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.toString() });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await deletePost(req.params.id);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.toString() });
  }
});

export default router;
