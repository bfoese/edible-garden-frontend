/* tslint:disable */
/* eslint-disable */
import { EntityInfoDto } from './entity-info-dto';
export interface BotanicalNodeDto {
  botanicalName: string;
  entityInfo: EntityInfoDto;
  i18nNames: { [key: string]: string };
  parent?: BotanicalNodeDto;
  taxonomicRank: 'Family' | 'Genus' | 'Species' | 'Subspecies' | 'Variety';
}
