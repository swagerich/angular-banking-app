export interface ClientDto {
  id?: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  repeatPassword:string;
  age: number;
  numberAccount?: string;
  active?: boolean;
}
