export class FilteredTreeResult<Node> {
  constructor(public treeData: Node[], public needsToExpanded: Node[] = []) {}
}
