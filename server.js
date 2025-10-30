import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "mysecretkey123";

// Dummy login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "student@college.com" && password === "12345") {
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
    return res.json({ success: true, token });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Protected route
app.get("/dashboard", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get Bearer token

  if (!token) return res.status(403).json({ message: "Token missing" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid or expired token" });
    res.json({ message: `Welcome ${decoded.email}, to your dashboard!` });
  });
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
