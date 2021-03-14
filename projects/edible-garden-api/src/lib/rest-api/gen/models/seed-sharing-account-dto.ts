/* tslint:disable */
/* eslint-disable */
import { AddressDto } from './address-dto';
import { PhoneNumberDto } from './phone-number-dto';
export interface SeedSharingAccountDto {
  address: AddressDto;
  email: string;
  phoneNumber: PhoneNumberDto;
  preferredLocale: string;
  userId: string;
  username: string;
}
