export const createFabricObjectId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `uuid-${Date.now().toString(16)}-${Math.random()
    .toString(16)
    .slice(2)}`;
};
