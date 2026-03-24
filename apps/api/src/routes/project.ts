import CreateProject from "../controllers/project";
import { Router } from "express";

const router = Router();


router.post('/create', CreateProject)

export default router