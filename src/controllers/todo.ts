import * as todoModel from "../models/todo"
import { crudController } from "../lib/utils"
import { BaseItem, Todo, TodoModel } from "../types/types"

export const todoController = crudController<Omit<Todo, BaseItem<undefined>>, TodoModel>(todoModel, "todo")
