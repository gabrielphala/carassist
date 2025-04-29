export const cutstr = (str: string, {offset, ignoreWindow} = {offset: 18, ignoreWindow: false}) => {
  if (str.length <= offset || (window.innerWidth > 425 && !ignoreWindow))
      return str;

  return `${str.slice(0, offset)}...`;
}