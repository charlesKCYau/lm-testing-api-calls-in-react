import { ERROR_418, ERROR_500 } from "../statics/error_code";

export const fetchResult = <T>(
  status: number | undefined,
  error: string,
  data: T | undefined,
) => {
  if (error) return error;

  if (status === 418) {
    return ERROR_418;
  } else if (status === 500) {
    return ERROR_500;
  } else if (status === 200) {
    return data !== undefined ? "Normal" : "No data returned";
  }

  return "Unknown status code";
};
