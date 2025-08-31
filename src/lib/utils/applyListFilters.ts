import { BaseItem, Filters } from "../../types/types"

export const validateFilters = (filters: Filters): boolean => {
  let isValidate = false
  if (!filters) isValidate = true
  else {
    const validations = {
      order: !!filters.order && /^(asc|desc)$/.test(filters.order),
      toDate: !filters.toDate || !isNaN(new Date(filters.toDate).getTime()),
      sort: !!filters.sort && /^(createdAt|updatedAt)$/.test(filters.sort),
      fromDate: !filters.fromDate || !isNaN(new Date(filters.fromDate).getTime()),
    }
    Object.entries(validations).forEach(([key, value]) => {
      const thisKey = key as keyof typeof filters
      if (!filters[thisKey]) return isValidate = true
      isValidate = !!validations[thisKey]
    })
  }
  return isValidate
}

export const applyListFilters = <T>(list: BaseItem<T>[], filters?: Filters) => {
  const { fromDate, toDate, sort = "createdAt", order = "desc" } = filters || {}
  if (!validateFilters({ fromDate, toDate, sort, order })) return undefined
  let data = list
  data.sort((a, b) => {
    const aVal = new Date(a[sort])
    const bVal = new Date(b[sort])
    if (order === "asc") return aVal.getTime() - bVal.getTime()
    return bVal.getTime() - aVal.getTime()
  })
  if (fromDate || toDate) {
    data = data.filter((todo) => {
      const createdAt = new Date(todo.createdAt)
      if (fromDate && createdAt < fromDate) return false
      if (toDate && createdAt > toDate) return false
      return true
    })
  }
  return data
}