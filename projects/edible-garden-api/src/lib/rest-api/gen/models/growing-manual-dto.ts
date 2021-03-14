/* tslint:disable */
/* eslint-disable */
import { BotanicalNodeDto } from './botanical-node-dto';
import { EntityInfoDto } from './entity-info-dto';
import { NutritionDemandDto } from './nutrition-demand-dto';
export interface GrowingManualDto {
  botanicalNode: BotanicalNodeDto;
  edibleParts: Array<'unknown' | 'root' | 'bulb' | 'stem' | 'flower' | 'leaf' | 'fruit' | 'seed' | 'sprout' | 'tuber' | 'rhizome' | 'pod'>;
  entityInfo: EntityInfoDto;
  i18nNames: { [key: string]: string };
  nutritionDemand: NutritionDemandDto;
}
