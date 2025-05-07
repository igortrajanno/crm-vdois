const express = require("express");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const { companyId } = req.user;
  try {
    const funis = await prisma.funil.findMany({
      where: { companyId },
      orderBy: { createdAt: "asc" },
    });
    res.json(funis);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar funis." });
  }
});

router.post("/", async (req, res) => {
  const { companyId } = req.user;
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Nome do funil é obrigatório." });

  try {
    const novo = await prisma.funil.create({
      data: { name, companyId },
    });
    res.status(201).json(novo);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar funil." });
  }
});

module.exports = router;
