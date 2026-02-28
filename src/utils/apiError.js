export const parseApiError = (error) => {
  if (!error) return "Произошла ошибка";

  if (error.response?.data) {
    const data = error.response.data;

    if (data.error) return data.error;

    if (typeof data.detail === "string") return data.detail;

    if (typeof data.message === "string") return data.message;
  }

  if (typeof error.message === "string") return error.message;

  return "Ошибка сервера";
};