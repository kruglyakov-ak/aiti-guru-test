import { isFetchBaseQueryError } from "../guards/isFetchBaseQueryError";

export function getErrorMessage(error: unknown): string {
  if (isFetchBaseQueryError(error)) {
    const data = error.data as { message?: string };
    return data?.message ?? "Ошибка запроса";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Неизвестная ошибка";
}