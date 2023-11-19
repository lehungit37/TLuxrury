export interface IRequestError {
  id?: string;
  message?: string;
  params?: { [x: string]: string };
}
