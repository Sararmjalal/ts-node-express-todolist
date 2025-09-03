import * as colorModel from "../models/color"
import { crudController } from "../lib/utils"
import { BaseItem, Color, ColorModel } from "../types/types"

export const colorController = crudController<Omit<Color, BaseItem<undefined>>, ColorModel>(colorModel, "color")
