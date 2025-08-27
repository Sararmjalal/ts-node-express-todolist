import { Router } from "express";
import { asyncHandler } from "../lib/utils";
import { ROUTES } from "../types/enums/routes";
import { addCategory, editCategory, getCategory, getCategories, removeCategory } from "../controllers/category";

const categoryRouter = Router()

const routes = [{
  fn: getCategories,
  method: "get",
  path: ROUTES.GET_ALL,
},
{
  fn: getCategory,
  method: "get",
  path: ROUTES.GET_SINGLE,
},
{
  fn: editCategory,
  method: "patch",
  path: ROUTES.EDIT,
},
{
  fn: removeCategory,
  method: "delete",
  path: ROUTES.REMOVE,
},
{
  fn: addCategory,
  method: "post",
  path: ROUTES.ADD,
}] as const

routes.forEach(({ fn, method, path }) => {
  categoryRouter[method](path, asyncHandler(fn))
})

export default categoryRouter