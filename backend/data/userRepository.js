const pool = require("../db");

const mapUserRow = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    passwordHash: row.password_hash,
    googleId: row.google_id,
    bio: row.bio || "",
    github: row.github || "",
    linkedin: row.linkedin || "",
    portfolio: row.portfolio || "",
    skills: [],
    endorsements: [],
  };
};

const toSafeUser = (user) => {
  if (!user) return null;
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    bio: user.bio || "",
    github: user.github || "",
    linkedin: user.linkedin || "",
    portfolio: user.portfolio || "",
    skills: Array.isArray(user.skills) ? [...user.skills] : [],
    endorsements: Array.isArray(user.endorsements) ? [...user.endorsements] : [],
  };
};

const getUserSkills = async (userId) => {
  const result = await pool.query(
    `SELECT skill
     FROM user_skills
     WHERE user_id = $1
     ORDER BY skill ASC`,
    [userId]
  );
  return result.rows.map((row) => row.skill);
};

const getUserEndorsements = async (userId) => {
  const result = await pool.query(
    `SELECT skill, endorsed_by, created_at
     FROM endorsements
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows.map((row) => ({
    skill: row.skill,
    endorsed_by: row.endorsed_by,
    date: row.created_at,
  }));
};

const hydrateUser = async (user) => {
  if (!user) return null;
  const [skills, endorsements] = await Promise.all([
    getUserSkills(user.id),
    getUserEndorsements(user.id),
  ]);
  return { ...user, skills, endorsements };
};

const getUserById = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return hydrateUser(mapUserRow(result.rows[0]));
};

const getUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email?.trim().toLowerCase(),
  ]);
  return hydrateUser(mapUserRow(result.rows[0]));
};

const getUserByGoogleId = async (googleId) => {
  const result = await pool.query("SELECT * FROM users WHERE google_id = $1", [googleId]);
  return hydrateUser(mapUserRow(result.rows[0]));
};

const createUser = async ({ fullName, email, passwordHash = null, googleId = null, skills = [] }) => {
  const result = await pool.query(
    `INSERT INTO users (full_name, email, password_hash, google_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [fullName?.trim(), email?.trim().toLowerCase(), passwordHash, googleId]
  );
  const user = mapUserRow(result.rows[0]);

  const normalizedSkills = (Array.isArray(skills) ? skills : [])
    .map((item) => item?.trim())
    .filter(Boolean);

  if (normalizedSkills.length > 0) {
    const values = [];
    const params = [];
    normalizedSkills.forEach((skill, index) => {
      const base = index * 2;
      values.push(`($${base + 1}, $${base + 2})`);
      params.push(user.id, skill);
    });
    await pool.query(
      `INSERT INTO user_skills (user_id, skill)
       VALUES ${values.join(",")}
       ON CONFLICT DO NOTHING`,
      params
    );
  }

  return getUserById(user.id);
};

const updateUser = async (id, updates = {}) => {
  const existing = await getUserById(id);
  if (!existing) return null;

  const nextFullName =
    typeof updates.fullName === "string" ? updates.fullName.trim() : existing.fullName;
  const nextBio = typeof updates.bio === "string" ? updates.bio : existing.bio;
  const nextGithub = typeof updates.github === "string" ? updates.github : existing.github;
  const nextLinkedin =
    typeof updates.linkedin === "string" ? updates.linkedin : existing.linkedin;
  const nextPortfolio =
    typeof updates.portfolio === "string" ? updates.portfolio : existing.portfolio;
  const nextGoogleId =
    typeof updates.googleId === "string" && updates.googleId.trim()
      ? updates.googleId.trim()
      : existing.googleId;

  await pool.query(
    `UPDATE users
     SET full_name = $1, bio = $2, github = $3, linkedin = $4, portfolio = $5, google_id = $6
     WHERE id = $7`,
    [nextFullName, nextBio, nextGithub, nextLinkedin, nextPortfolio, nextGoogleId, id]
  );

  if (Array.isArray(updates.skills)) {
    const normalizedSkills = updates.skills.map((item) => item?.trim()).filter(Boolean);
    await pool.query("DELETE FROM user_skills WHERE user_id = $1", [id]);

    if (normalizedSkills.length > 0) {
      const values = [];
      const params = [];
      normalizedSkills.forEach((skill, index) => {
        const base = index * 2;
        values.push(`($${base + 1}, $${base + 2})`);
        params.push(id, skill);
      });
      await pool.query(
        `INSERT INTO user_skills (user_id, skill)
         VALUES ${values.join(",")}
         ON CONFLICT DO NOTHING`,
        params
      );
    }
  }

  return getUserById(id);
};

const addEndorsement = async (id, { skill, endorsedBy }) => {
  const user = await getUserById(id);
  if (!user) return { error: "USER_NOT_FOUND" };

  const hasSkill = user.skills.includes(skill);
  if (!hasSkill) return { error: "SKILL_NOT_FOUND" };

  try {
    await pool.query(
      `INSERT INTO endorsements (user_id, skill, endorsed_by)
       VALUES ($1, $2, $3)`,
      [id, skill, endorsedBy]
    );
  } catch (error) {
    if (error.code === "23505") {
      return { error: "DUPLICATE_ENDORSEMENT" };
    }
    throw error;
  }

  const endorsements = await getUserEndorsements(id);
  return { endorsements };
};

const searchUsers = async ({ query = "", skill = "", excludeUserId, currentUserId, limit = 50 } = {}) => {
  const excludedId = Number.isFinite(Number(excludeUserId)) ? Number(excludeUserId) : null;
  const currentId = Number.isFinite(Number(currentUserId)) ? Number(currentUserId) : null;
  const safeLimit = Math.min(Math.max(Number(limit) || 50, 1), 100);

  const currentUserSkills = currentId ? await getUserSkills(currentId) : [];
  const currentSkillSet = new Set(currentUserSkills.map((item) => item.toLowerCase()));

  const result = await pool.query(
    `SELECT
       u.id,
       u.full_name,
       u.email,
       u.bio,
       u.github,
       u.linkedin,
       u.portfolio,
       COALESCE(array_remove(array_agg(DISTINCT us.skill), NULL), '{}') AS skills,
       COUNT(DISTINCT e.id)::int AS endorsements_count
     FROM users u
     LEFT JOIN user_skills us ON us.user_id = u.id
     LEFT JOIN endorsements e ON e.user_id = u.id
     WHERE ($1::int IS NULL OR u.id <> $1)
     GROUP BY u.id
     ORDER BY endorsements_count DESC, u.full_name ASC
     LIMIT $2`,
    [excludedId, safeLimit]
  );

  const normalizedQuery = query?.trim().toLowerCase() || "";
  const normalizedSkill = skill?.trim().toLowerCase() || "";

  return result.rows
    .map((row) => ({
      id: row.id,
      fullName: row.full_name,
      email: row.email,
      bio: row.bio || "",
      github: row.github || "",
      linkedin: row.linkedin || "",
      portfolio: row.portfolio || "",
      skills: Array.isArray(row.skills) ? row.skills : [],
      endorsements: [],
      endorsementsCount: row.endorsements_count || 0,
    }))
    .filter((user) => {
      const haystack = `${user.fullName} ${user.bio} ${user.skills.join(" ")}`.toLowerCase();
      const queryMatched = !normalizedQuery || haystack.includes(normalizedQuery);
      const skillMatched =
        !normalizedSkill ||
        user.skills.some((item) => item.toLowerCase().includes(normalizedSkill));
      return queryMatched && skillMatched;
    })
    .map((user) => {
      const sharedSkills = user.skills.filter((item) => currentSkillSet.has(item.toLowerCase()));
      const denominator = Math.max(new Set([...user.skills, ...currentUserSkills]).size, 1);
      const matchScore = Math.round((sharedSkills.length / denominator) * 100);

      return {
        ...user,
        sharedSkills,
        matchScore,
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore || b.endorsementsCount - a.endorsementsCount);
};

module.exports = {
  toSafeUser,
  createUser,
  updateUser,
  addEndorsement,
  getUserById,
  getUserByEmail,
  getUserByGoogleId,
  searchUsers,
};
