const isAuthError = error => {
  return error?.status === 401;
};

export default isAuthError;
