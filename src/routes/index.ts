import todoRouter from "./todo"
import { Router } from "express"
import { BASE_ROUTES } from "../types/enums/routes"

const router = Router()

router.use(BASE_ROUTES.todo, todoRouter)

export default router