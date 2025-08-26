import { Router } from "express";
import { asyncHandler } from "../lib/utils";
import { ROUTES } from "../types/enums/routes";
import { addTodo, editTodo, getTodo, getTodos, removeTodo } from "../controllers/todo";

const todoRouter = Router()

const routes = [{
  fn: getTodos,
  method: "get",
  path: ROUTES.GET_ALL,
},
{
  fn: getTodo,
  method: "get",
  path: ROUTES.GET_SINGLE,
},
{
  fn: editTodo,
  method: "patch",
  path: ROUTES.EDIT,
},
{
  fn: removeTodo,
  method: "delete",
  path: ROUTES.REMOVE,
},
{
  fn: addTodo,
  method: "post",
  path: ROUTES.ADD,
}] as const

routes.forEach(({ fn, method, path }) => {
  todoRouter[method](path, asyncHandler(fn))
})

export default todoRouter