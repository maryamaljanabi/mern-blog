import express from "express";
import {
  getAllUsers,
  getOneUser,
  addUser,
  updateUser,
  deleteUser,
} from "../services/userServices";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.toString() });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await getOneUser(req.params.id);
    res.send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.toString() });
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await addUser(req.body.user);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.toString() });
  }
});

router.put("/", async (req, res) => {
  try {
    const result = await updateUser(req.body.user);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.toString() });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.toString() });
  }
});

export default router;
