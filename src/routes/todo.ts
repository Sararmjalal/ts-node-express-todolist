import { Router } from "express";
import { asyncHandler } from "../lib/utils";
import { ROUTES } from "../types/enums/routes";
import { addTodo, editTodo, getTodo, getTodos, removeTodo } from "../controllers/todo";

const router = Router()

const routes = [{
  fn: getTodos,
  method: "get",
  path: ROUTES.GET_TODOS,
},
{
  fn: getTodo,
  method: "get",
  path: ROUTES.GET_TODO,
},
{
  fn: editTodo,
  method: "patch",
  path: ROUTES.EDIT_TODO,
},
{
  fn: removeTodo,
  method: "delete",
  path: ROUTES.REMOVE_TODO,
},
{
  fn: addTodo,
  method: "post",
  path: ROUTES.ADD_TODO,
}] as const

routes.forEach(({ fn, method, path }) => {
  router[method](path, asyncHandler(fn))
})