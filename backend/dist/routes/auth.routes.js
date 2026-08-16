"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_js_1 = require("../controllers/auth.controller.js");
const router = (0, express_1.Router)();
router.post("/register", auth_controller_js_1.register);
router.post("/login", auth_controller_js_1.login);
exports.default = router;
