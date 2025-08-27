import { Filters, ListItem } from "../../types/types"

export const validateFilters = (filters: Filters): boolean => {
  let isValidate = false
  if (!filters) isValidate = true
  else {
    const validations = {
      order: !!filters.order && /^(asc|desc)$/.test(filters.order),
      toDate: !filters.toDate || !isNaN(new Date(filters.toDate).getTime()),
      sortBy: !!filters.sortBy && /^(createdAt|updatedAt)$/.test(filters.sortBy),
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

export const applyListFilters = <T>(list: (ListItem & T)[], filters?: Filters) => {
  if (!validateFilters) return undefined
  const { fromDate, toDate, sortBy = "createdAt", order = "desc" } = filters || {}
  let data = list
  data.sort((a, b) => {
    const aVal = new Date(a[sortBy])
    const bVal = new Date(b[sortBy])
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