import { crudController } from "../lib/utils"
import * as categoryModel from "../models/category"
import { BaseItem, Category, CategoryModel } from "../types/types"

export const categoryController = crudController<Omit<Category, BaseItem<undefined>>, CategoryModel>(categoryModel, "category")
