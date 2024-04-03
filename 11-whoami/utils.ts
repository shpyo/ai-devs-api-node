export const delay = (time = 2600) =>
  new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
