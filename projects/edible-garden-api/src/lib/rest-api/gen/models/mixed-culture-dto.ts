/* tslint:disable */
/* eslint-disable */
import { BotanicalNodeDto } from './botanical-node-dto';
import { EntityInfoDto } from './entity-info-dto';
export interface MixedCultureDto {
  entityInfo: EntityInfoDto;
  firstCompanion: BotanicalNodeDto;
  i18nDescriptions: { [key: string]: string };
  isDisadvantageous: boolean;
  secondCompanion: BotanicalNodeDto;
}
