/* tslint:disable */
/* eslint-disable */
import { EntityInfoDto } from './entity-info-dto';
export interface BotanicalTreeNodeDto {
  botanicalName: string;
  children: Array<any>;
  entityInfo: EntityInfoDto;
  i18nNames: { [key: string]: string };
  taxonomicRank: 'Family' | 'Genus' | 'Species' | 'Subspecies' | 'Variety';
}
