export const success = (message, data = null) => ({
  status: true,
  message,
  data,
});

export const error = (message, err = null) => ({
  status: false,
  message,
  error: err?.message || err,
});
