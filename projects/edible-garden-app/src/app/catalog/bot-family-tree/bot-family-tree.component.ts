import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { BotanicalTreeNodeDto } from '@eg/edible-garden-api/src/public-api';

import { NzTreeFlatDataSource, NzTreeFlattener } from 'ng-zorro-antd/tree-view';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { auditTime, map, tap } from 'rxjs/operators';

import { BotanicalNodeReqCacheService } from './botanical-node-req-cache.service';
import { FlatNode } from './flat-node.interface';
import { TaxonomicTreeNode } from './taxonomic-tree-node';
import { TreeHelper } from './tree-helper';
import { TreeNode } from './tree-node.interface';

@Component({
  selector: 'eg-bot-family-tree',
  templateUrl: './bot-family-tree.component.html',
  styleUrls: ['./bot-family-tree.component.scss']
})
export class BotFamilyTreeComponent implements OnInit {
  TreeHelper = TreeHelper;

  private flatNodeMap = new Map<FlatNode, TreeNode>();
  private nestedNodeMap = new Map<TreeNode, FlatNode>();
  private expandedNodes: TreeNode[] = [];
  private originData$: Observable<
    BotanicalTreeNodeDto[]
  > = this.botanicalNodeReqCacheService.getTree();
  public readonly searchValue$ = new BehaviorSubject<string>('');

  public treeControl = new FlatTreeControl<FlatNode, TreeNode>(
    (node) => node.level,
    (node) => node.expandable,
    {
      trackBy: (flatNode) => {
        const node = this.flatNodeMap.get(flatNode);
        return node ? node : flatNode;
      }
    }
  );

  private transformer = (node: TreeNode, levelNo: number): FlatNode => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.name === node.name
        ? existingNode
        : {
            expandable: !!node.children && node.children.length > 0,
            name: node.name,
            level: levelNo
          };
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  private treeFlattener = new NzTreeFlattener<TreeNode, FlatNode, TreeNode>(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.children
  );

  public readonly dataSource = new NzTreeFlatDataSource(
    this.treeControl,
    this.treeFlattener
  );

  private filteredData$ = combineLatest([
    this.originData$.pipe(
      map((nodes) => nodes.map((node) => new TaxonomicTreeNode(node)))
    ),
    this.searchValue$.pipe(auditTime(600))
  ]).pipe(
    tap((foo) => console.log('tap', foo)),
    map(([data, value]) =>
      TreeHelper.filterTreeData<TaxonomicTreeNode>(
        data,
        value,
        (node: TaxonomicTreeNode, searchExpr: string): boolean => {
          const botTreeNode = node?.botanicalTreeNodeDto;
          if (botTreeNode && botTreeNode.botanicalName && value) {
            return (
              botTreeNode.botanicalName
                .toLowerCase()
                .search(searchExpr.toLocaleLowerCase()) !== -1
            );
          }
          return false;
        }
      )
    )
  );

  constructor(
    private botanicalNodeReqCacheService: BotanicalNodeReqCacheService
  ) {}

  ngOnInit(): void {
    this.filteredData$.subscribe((result) => {
      this.dataSource.setData(result.treeData);

      const hasSearchValue = !!this.searchValue$.getValue();
      if (hasSearchValue) {
        if (this.expandedNodes.length === 0) {
          this.expandedNodes = this.treeControl.expansionModel.selected;
          this.treeControl.expansionModel.clear();
        }
        this.treeControl.expansionModel.select(...result.needsToExpanded);
      } else {
        if (this.expandedNodes.length) {
          this.treeControl.expansionModel.clear();
          this.treeControl.expansionModel.select(...this.expandedNodes);
          this.expandedNodes = [];
        }
      }
    });
  }
}
