/* tslint:disable */
/* eslint-disable */
import { AddressDto } from './address-dto';
import { BotanicalNodeDto } from './botanical-node-dto';
import { EntityInfoDto } from './entity-info-dto';
import { PhoneNumberDto } from './phone-number-dto';
import { UserDto } from './user-dto';
export interface SeedSharingOfferDto {
  address: AddressDto;
  botanicalNode?: BotanicalNodeDto;
  cultivarEpithet?: string;
  cultivationPrinciple?: 'organic' | 'synthetic';
  description?: string;
  entityInfo?: EntityInfoDto;
  phoneNumber?: PhoneNumberDto;
  shareableReproductiveMaterial: 'seed' | 'tuberBulbRhizome' | 'seedling' | 'cuttingOffshoot';
  user?: UserDto;
}
