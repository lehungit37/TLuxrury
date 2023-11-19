export interface IError {
  id?: string;
  message: string;
}

export interface IErrors {
  [x: string]: IError[];
}
