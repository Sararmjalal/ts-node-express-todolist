import { Router } from "express"
import { BASE_ROUTES } from "../types/enums/routes"
import { createRouter } from "../lib/utils"
import { todoController } from "../controllers/todo"
import { categoryController } from "../controllers/category"

const appRouter = Router()

const routes = [{
  path: BASE_ROUTES.todo,
  router: createRouter(todoController)
},
{
  path: BASE_ROUTES.category,
  router: createRouter(categoryController)
}]

routes.forEach(({ path, router }) => {
  console.log({ path, router })
  appRouter.use(path, router)
})

console.log({ appRouter })

export default appRouter