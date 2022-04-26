export const actionErrors = (
  type: string,
  isSaga: boolean,
  isReducerFn: boolean,
  watchersKeys: string[],
  handlerKeys: string[]
) => {
  if (type === "") throw new Error("Type cannot be empty string");
  if (isReducerFn && handlerKeys.includes(type)) throw new Error("Type must be unique");
  if (isSaga && watchersKeys.includes(`${type}_SAGA`)) throw new Error("Type must be unique");
  if (!isReducerFn && !isSaga)
    throw new Error("Not valid action configuration.Either 'reducerFn' or 'saga' have to be provided");
};
