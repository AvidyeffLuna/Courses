/* eslint-disable no-console */

export const printLog = (log: any) => {
  if (process.env.NODE_ENV === 'development') console.log(log);
};

export const printLogError = (error: any) => {
  if (process.env.NODE_ENV === 'development') console.error(error);
};
