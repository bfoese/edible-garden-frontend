import { FilteredTreeResult } from './filtered-tree-result';
import { FlatNode } from './flat-node.interface';
import { TreeNode } from './tree-node.interface';

export class TreeHelper {
  public static hasChild = (_: number, node: FlatNode): boolean =>
    node.expandable;

  /**
   * @param cbFilter - Callback function that can be implemented individually to
   * decide whether the given node should be whitelisted by the given search
   * expression. If 'true' is being returned, the node will be in the filtered
   * tree, otherwise not.
   * @param cbGetChildren - Callback function that can be implemented
   * individually to retrieve the children of the given node
   */
  // public static filterTreeData<Node>(
  //   data: Node[],
  //   value: string,
  //   cbFilter: { (node: Node, searchExpr: string): boolean },
  //   cbGetChildren: { (node: Node): Node[] }
  // ): FilteredTreeResult<Node> {
  //   if (!value || value.trim.length === 0) {
  //     return new FilteredTreeResult(data);
  //   }

  //   const needsToExpanded = new Set<Node>();
  //   const _filter = (node: Node, result: Node[]) => {
  //     if (cbFilter(node, value)) {
  //       result.push(node);
  //       return result;
  //     }
  //     const children = cbGetChildren(node);
  //     if (Array.isArray(children)) {
  //       const nodes = children.reduce((a, b) => _filter(b, a), [] as Node[]);
  //       if (nodes.length) {
  //         const parentNode = { ...node, children: nodes };
  //         needsToExpanded.add(parentNode);
  //         result.push(parentNode);
  //       }
  //     }
  //     return result;
  //   };
  //   const treeData = data.reduce((a, b) => _filter(b, a), [] as Node[]);
  //   return new FilteredTreeResult(treeData, [...needsToExpanded]);
  // }

  public static filterTreeData<T extends TreeNode>(
    data: T[],
    searchExpr: string,
    cbFilter: (node: T, searchExpr: string) => boolean
  ): FilteredTreeResult<TreeNode> {
    if (!searchExpr || searchExpr.trim().length === 0) {
      return new FilteredTreeResult(data);
    }

    const needsToExpanded = new Set<TreeNode>();
    const _filter = (node: TreeNode, result: TreeNode[]) => {
      if (cbFilter(node as T, searchExpr)) {
        result.push(node);
        return result;
      }
      if (Array.isArray(node.children)) {
        const nodes = node.children.reduce(
          (a, b) => _filter(b, a),
          [] as TreeNode[]
        );
        if (nodes.length) {
          const parentNode = { ...node, children: nodes };
          needsToExpanded.add(parentNode);
          result.push(parentNode);
        }
      }
      return result;
    };
    const treeData = data.reduce((a, b) => _filter(b, a), [] as TreeNode[]);
    return new FilteredTreeResult(treeData, [...needsToExpanded]);
  }

  // public static filterTreeData<Node extends TreeNode>(
  //   data: Node[],
  //   value: string
  // ): FilteredTreeResult<Node> {
  //   if (!value || value.trim.length === 0) {
  //     return new FilteredTreeResult(data);
  //   }

  //   const needsToExpanded = new Set<Node>();
  //   const _filter = (node: Node, result: Node[]) => {
  //     if (node.name.search(value) !== -1) {
  //       result.push(node);
  //       return result;
  //     }
  //     if (Array.isArray(node.children)) {
  //       const nodes = node.children.reduce(
  //         (a, b) => _filter(b, a),
  //         [] as Node[]
  //       );
  //       if (nodes.length) {
  //         const parentNode = { ...node, children: nodes };
  //         needsToExpanded.add(parentNode);
  //         result.push(parentNode);
  //       }
  //     }
  //     return result;
  //   };
  //   const treeData = data.reduce((a, b) => _filter(b, a), [] as Node[]);
  //   return new FilteredTreeResult(treeData, [...needsToExpanded]);
  // }
}
