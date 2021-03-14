/* tslint:disable */
/* eslint-disable */
import { AddressDto } from './address-dto';
import { PhoneNumberDto } from './phone-number-dto';
export interface SeedSharingOfferCreationDto {
  address: AddressDto;
  botanicalNodeId?: string;
  cultivarEpithet?: string;
  cultivationPrinciple?: 'organic' | 'synthetic';
  description?: string;
  phoneNumber?: PhoneNumberDto;
  shareableReproductiveMaterial: 'seed' | 'tuberBulbRhizome' | 'seedling' | 'cuttingOffshoot';
}
