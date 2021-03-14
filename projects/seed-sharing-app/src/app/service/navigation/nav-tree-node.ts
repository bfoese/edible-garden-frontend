export class NavTreeNode {
  public constructor(
    public parent: NavTreeNode,
    public id: string,
    public relativePath: string
  ) {}

  public get pathFull(): string {
    return this.buildFullPath(this, '');
  }

  private buildFullPath(node: NavTreeNode, path: string): string {
    if (!node) {
      return path;
    }

    const appendedPath = `${node.relativePath}${
      path && path.length > 0 ? '/' + path : ''
    }`;

    return this.buildFullPath(node.parent, appendedPath);
  }
}
