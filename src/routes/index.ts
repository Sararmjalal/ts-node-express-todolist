import { Router } from "express"
import { createRouter } from "../lib/utils"
import { BASE_ROUTES } from "../types/enums/routes"
import { todoController } from "../controllers/todo"
import { colorController } from "../controllers/color"
import { categoryController } from "../controllers/category"

const appRouter = Router()

const routes = [{
  path: BASE_ROUTES.todo,
  router: createRouter(todoController)
},
{
  path: BASE_ROUTES.category,
  router: createRouter(categoryController)
},
{
  path: BASE_ROUTES.color,
  router: createRouter(colorController)
}]

routes.forEach(({ path, router }) => {
  appRouter.use(path, router)
})

export default appRouter