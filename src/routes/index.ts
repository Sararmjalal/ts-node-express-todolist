import todoRouter from "./todo"
import { Router } from "express"
import { BASE_ROUTES } from "../types/enums/routes"
import categoryRouter from "./category"

const appRouter = Router()

const routes = [{
  path: BASE_ROUTES.todo,
  router: todoRouter
},
{
  path: BASE_ROUTES.category,
  router: categoryRouter
}]

routes.forEach(({ path, router }) => {
  appRouter.use(path, router)
})

export default appRouter