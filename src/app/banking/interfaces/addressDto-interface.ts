export interface AddressDto {
  id?: number;
  street: string;
  direction: string;
  codePostal: number;
  city: string;
  country: string;
  userId?: number;
}
