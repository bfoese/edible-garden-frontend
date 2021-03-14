import { BotanicalTreeNodeDto } from '@eg/edible-garden-api/src/public-api';

import { TreeNode } from './tree-node.interface';

export class TaxonomicTreeNode implements TreeNode {
  constructor(public botanicalTreeNodeDto: BotanicalTreeNodeDto) {}

  public get name(): string {
    return this.botanicalTreeNodeDto.botanicalName;
  }

  public get children(): TreeNode[] {
    if (!this.botanicalTreeNodeDto.children) {
      return [];
    }
    return this.botanicalTreeNodeDto.children.map(
      (child: BotanicalTreeNodeDto) => new TaxonomicTreeNode(child)
    );
  }
}
