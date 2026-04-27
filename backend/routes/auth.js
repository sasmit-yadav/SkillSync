
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const {
  createUser,
  updateUser,
  addEndorsement,
  getUserById,
  getUserByEmail,
  searchUsers,
  toSafeUser,
} = require("../data/userRepository");

router.post("/register", async (req, res) => {
  try {
    const fullName = req.body.fullName?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const skills = Array.isArray(req.body.skills) ? req.body.skills : [];

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (confirmPassword !== undefined && confirmPassword !== password) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    if (await getUserByEmail(email)) {
      return res.status(400).json({ message: "User already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser({ fullName, email, passwordHash, skills });

    res.status(201).json({ message: "User registered", user: toSafeUser(user) });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user || !user.passwordHash) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user: toSafeUser(user) });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5175/dashboard", // change to frontend route
    failureRedirect: "/login",
  })
);

router.get("/logout", (req, res) => {
  req.logout(() => res.redirect("/"));
});

router.get("/current_user", (req, res) => {
  res.send(req.user || null);
});

router.get("/profile/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(toSafeUser(user));
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/profile/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  const { fullName, bio, github, linkedin, portfolio, skills = [] } = req.body;
  try {
    const existing = await getUserById(userId);
    if (!existing) {
      return res.status(404).json({ message: "User not found" });
    }

    const updated = await updateUser(userId, {
      fullName,
      bio,
      github,
      linkedin,
      portfolio,
      skills,
    });
    res.json(toSafeUser(updated));
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/endorse/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  const { skill, endorsedBy } = req.body;
  if (!skill || !endorsedBy) {
    return res.status(400).json({ message: "Skill and endorser are required" });
  }

  try {
    const result = await addEndorsement(userId, { skill, endorsedBy });
    if (result.error === "USER_NOT_FOUND") {
      return res.status(404).json({ message: "User not found" });
    }
    if (result.error === "SKILL_NOT_FOUND") {
      return res.status(400).json({ message: "User doesn't have this skill" });
    }
    if (result.error === "DUPLICATE_ENDORSEMENT") {
      return res.status(400).json({ message: "Already endorsed this skill" });
    }

    res.json({
      message: "Skill endorsed successfully",
      endorsements: result.endorsements,
    });
  } catch (err) {
    console.error("Endorsement error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/collaborators", async (req, res) => {
  try {
    const { query = "", skill = "", excludeUserId, currentUserId, limit } = req.query;
    const collaborators = await searchUsers({
      query,
      skill,
      excludeUserId,
      currentUserId,
      limit,
    });
    res.json({ collaborators, total: collaborators.length });
  } catch (err) {
    console.error("Collaborator search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
