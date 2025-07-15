export const isArrNull = (arr: any) => !arr || arr && arr.length == 0;

export const allEmpty = (...params: any) => {
  for (let i = 0; i < params.length; i++) {
    if (!isArrNull(params[i])) return false;
  }

  return true;
}