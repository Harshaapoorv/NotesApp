export default getErrorMessage = error => {
  if (error?.status === 'FETCH_ERROR') {
    return {
      title: 'Connection Error',
      description: 'Please check your internet connection and try again.',
    };
  }

  if (error?.status === 404) {
    return {
      title: 'Note Not Found',
      description: 'This note no longer exists.',
    };
  }

  if (error?.status === 422 && error?.data?.detail) {
    return {
      title: 'Validation Error',

      description: error.data.detail.message,
    };
  }

  if (error?.status === 500) {
    return {
      title: 'Server Error',
      description: error?.data?.detail
        ? error?.data?.detail
        : 'Something went wrong. Please try again later.',
    };
  }

  if (error?.data?.detail === 'User already exists') {
    return {
      title: 'User Already Exists',
      description:
        'An account with this email already exists. Please log in instead.',
    };
  }

  if (error?.data?.detail === 'Completed notes cannot change status directly') {
    return {
      title: 'Action Not Allowed',
      description:
        'This note is already completed. Use Edit Note to modify it.',
    };
  }

  if (error?.data?.detail === 'User not found') {
    return {
      title: error.data.detail,
      description:
        "There is no account with the email you've entered. Try signing up instead.",
    };
  }

  if (error?.data?.detail === 'Invalid credentials') {
    return {
      title: error.data.detail,
      description:
        "The credentials you entered don't match our records. Please check your spelling and try again, or reset your password.",
    };
  }

  return {
    title: 'Something went wrong',
    description: error?.data?.detail
      ? typeof error?.data?.detail === 'string'
        ? error?.data?.detail
        : 'Please try again.'
      : 'Please try again.',
  };
};
