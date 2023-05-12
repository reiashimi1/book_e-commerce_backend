import { Router } from "express";
import { getUsers } from "../controllers/user";

const router = Router();

// move the functions to the controllers directory
router.get("/", getUsers);

router.post("/", (req, res) => {
  res.send(req.body);
});

router.patch("/", (req, res) => {
  res.send(req.body);
});

router.delete("/", (req, res) => {
  res.send(req.body);
});

export default router;
