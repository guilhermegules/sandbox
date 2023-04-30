export const logger = (store: any) => (next: any) => (action: any) => {
  console.group(action.type);
  console.log("ACTION", action);
  console.log("PREV_STATE", store.getState());
  const result = next(action);
  console.log("NEW_STATE", store.getState());
  console.groupEnd();
  return result;
};
