import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/me", requireAuth, (req, res) => {
  res.json({
    success: true,
    user: res.locals.user,
  });
});

export default router;