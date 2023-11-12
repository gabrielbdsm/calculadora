import express from "express";
import * as calculadora from "../controllers/calculadora.js"
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index.html")

  
});
router.post("/", calculadora.calcular)
router.get("/ping", (req, res) => {
  res.json({ pong: true });
});

export default router;
