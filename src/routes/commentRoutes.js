import express from "express";
import {
  addComment,
  deleteComment,
  updateComment,
} from "../services/commentServices";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const result = await addComment(req.body.comment);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.toString() });
  }
});

router.put("/", async (req, res) => {
  try {
    const result = await updateComment(req.body.comment);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.toString() });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteComment(req.params.id);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.toString() });
  }
});

export default router;
