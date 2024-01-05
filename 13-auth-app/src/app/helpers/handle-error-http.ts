import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

export const handleErrorHttp = (err: any, messageDefault?: string) => {
  if (err instanceof HttpErrorResponse) {
    return throwError(() => err.error.message)
  }

  return throwError(() => messageDefault ?? 'Se produjo un error inesperado, lo sentimos.');
}
