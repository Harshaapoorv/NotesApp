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

  if (error?.status === 500) {
    return {
      title: 'Server Error',
      description: error?.data?.detail
        ? error?.data?.detail
        : 'Something went wrong. Please try again later.',
    };
  }

  if (error?.data?.detail === 'Completed notes cannot change status directly') {
    return {
      title: 'Action Not Allowed',
      description:
        'This note is already completed. Use Edit Note to modify it.',
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
