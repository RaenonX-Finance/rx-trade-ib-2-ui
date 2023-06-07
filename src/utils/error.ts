type GetErrorMessageOpts = {
  err: any,
  logError?: boolean,
};

export const getErrorMessage = ({err, logError = true}: GetErrorMessageOpts): string => {
  if (logError) {
    ``;
    console.error(err);
  }

  const isJsError = err instanceof Error;

  if (isJsError) {
    return `${err.message}`;
  }

  return '(Please check the error in console.)';
};
