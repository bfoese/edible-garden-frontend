/* tslint:disable */
/* eslint-disable */
import { AddressDto } from './address-dto';
import { PhoneNumberDto } from './phone-number-dto';
export interface PatchSeedSharingAccountDto {
  address?: AddressDto;
  phoneNumber?: PhoneNumberDto;
  preferredLocale?: string;
}
