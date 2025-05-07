const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "segredo-temporario";

router.post("/register", async (req, res) => {
  const { email, password, companyName } = req.body;
  if (!email || !password || !companyName) {
    return res.status(400).json({ error: "Campos obrigatórios." });
  }
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: "Email já registrado." });

    const hashed = await bcrypt.hash(password, 10);
    const company = await prisma.company.create({
      data: {
        name: companyName,
        users: {
          create: {
            email,
            password: hashed,
            role: "admin",
          },
        },
      },
      include: { users: true },
    });

    const user = company.users[0];
    const token = jwt.sign({ userId: user.id, companyId: company.id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Erro ao registrar." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Usuário não encontrado." });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Senha incorreta." });

    const token = jwt.sign({ userId: user.id, companyId: user.companyId, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Erro ao logar." });
  }
});

module.exports = router;
