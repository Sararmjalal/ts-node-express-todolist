export const generateUid = (startKey?: string) => {
  const thisId = crypto.randomUUID()
  return startKey ? `${startKey}_${thisId}` : thisId
};