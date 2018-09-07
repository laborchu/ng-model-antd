import {
  Component,
  AfterContentChecked,
  Input,
  EventEmitter,
  Output,
  PipeTransform
} from '@angular/core';
import {
  NgdsDataGridConfig, NgdsDataGridOption, NgdsDataGridOpBtnOption, pipeFunc,
  NgdsDataGridColumnOption, NgdsDataGridModel, NgdsDataGridPageModel
} from './datagrid.config';

let hashPageMap: Map<number, any> = new Map();

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'ngds-datagrid',
  exportAs: 'ngdsDataGrid',
  template: `
    <nz-table #nzTable 
            [nzAjaxData]="data" 
            [nzPageSize]="page?.pageSize"
            [nzTotal]="page?.totalCount" 
            [(nzPageIndex)]="_pageIndex" 
            [nzLoading]="_loading" 
            [nzIsPagination]="(page&&page.pageSize>1)?true:false"
            (nzPageIndexChange)="search()">
      <thead nz-thead>
        <tr>
          <th nz-th [nzCheckbox]="option.table.showCheck" *ngIf="option.table.showCheck">
            <label nz-checkbox [(ngModel)]="_allChecked" [nzIndeterminate]="_indeterminate" (ngModelChange)="_checkAll($event)">
            </label>
          </th>
          <th *ngFor="let col of option.table.columns;" nz-th [nzWidth]="col.width">
            <span>{{col.text}}</span>
            <nz-table-sort *ngIf="col.showSort" (nzValueChange)="_sort(col.property,$event)"></nz-table-sort>
          </th>
          <th *ngIf="option.table.op" nz-th [nzWidth]="option.table.op.width">操作</th>
        </tr>
      </thead>
      <tbody nz-tbody>
        <ng-template ngFor let-data [ngForOf]="nzTable.data">
          <ng-template ngFor let-item [ngForOf]="expandDataCache[data[option.dataKey]]">
            <tr nz-tbody-tr *ngIf="(item.parent&&item.parent.expand)||!(item.parent)">
              <td nz-td [nzCheckbox]="option.table.showCheck" *ngIf="option.table.showCheck">
                <label nz-checkbox [nzDisabled]="item.disabled" [(ngModel)]="originDataCache[item[option.dataKey]].checked" (ngModelChange)="_refreshStatus($event)">
                </label>
              </td>
              <td *ngFor="let col of option.table.columns;let colIndex = index"
                  title="{{col.title? (item[col.property]):''}}">
                  <nz-row-indent [nzIndentSize]="item.level"></nz-row-indent>
                  <nz-row-expand-icon *ngIf="item.showExpand&&colIndex==0" [(nzExpand)]="item.expand" (nzExpandChange)="collapse(expandDataCache[data[option.dataKey]],item,$event)" [nzShowExpand]="item.showExpand&&colIndex==0"></nz-row-expand-icon>
                  <ngds-column [colOption]="col" [item]="item"></ngds-column>
              </td>
              <td *ngIf="option.table.op" class="op-td">
                  <span *ngFor="let btn of option.table.op.buttons;let btnIndex = index" >
                    <span nz-table-divider *ngIf="btnIndex!=0&&(btn.hidden?!btn.hidden(item):true)"></span>
                    <a [hidden]="btn.hidden?btn.hidden(item):false"
                          (click)="btn.action(item,dataIndex)"
                          class="{{getBtnStyle(btn,item)}}">
                          <i class="anticon anticon-loading anticon-spin" *ngIf="showBtnLoading(btn,item)"></i>
                          {{getBtnText(btn,item)}}
                    </a>
                  </span>
                  <nz-dropdown *ngFor="let groupButton of option.table.op.groupButtons;let groupIndex = index">
                    <span nz-table-divider></span>
                    <a class="ant-dropdown-link" nz-dropdown>
                      {{getBtnText(groupButton,item)}} <i class="anticon anticon-down"></i>
                    </a>
                    <ul nz-menu>
                      <li nz-menu-item *ngFor="let gbtn of groupButton.buttons">
                        <a [hidden]="gbtn.hidden?gbtn.hidden(item):false"
                              (click)="gbtn.action(item)">
                              {{getBtnText(gbtn,item)}}
                        </a>
                      </li>
                    </ul>
                  </nz-dropdown>
              </td>
            </tr>
          </ng-template>
        </ng-template>
      </tbody>
    </nz-table>

  `
})
export class NgdsDataGrid implements AfterContentChecked {
  constructor(config: NgdsDataGridConfig) {
  }

  @Input() option: NgdsDataGridOption;
  @Output() checkboxChange: EventEmitter<any> = new EventEmitter();

  _pageIndex: number = 1;
  page: NgdsDataGridPageModel;
  data: Array<any> = [];
  searchParams: any = {};
  _loading: boolean = false;

  _allChecked: boolean = false;
  _indeterminate = false;
  hash: number;

  hashCode(source: string): number {
    return source.split("").reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);
  };

  ngOnInit() {
    //缓存数据
    this.hash = this.hashCode(JSON.stringify(this.option.table));
    let cachedParams:any = hashPageMap.get(this.hash);
    if(!cachedParams){
      cachedParams = {};
      hashPageMap.set(this.hash,cachedParams);
    }
    this._pageIndex = cachedParams.pageIndex || 1;

    this.option.initToSearch !== false && this.search(cachedParams.params);
  }

  getBtnStyle = function (btn: NgdsDataGridOpBtnOption, item: any) {
    if (btn.style) {
      if (typeof btn.style === "function") {
        return btn.style(item);
      } else {
        return btn["style"];
      }
    } else {
      return 'btn-default';
    }
  }

  showBtnLoading = function (btn: NgdsDataGridOpBtnOption, item: any): boolean {
    if (btn.loading) {
      if (typeof btn.loading === "function") {
        return btn.loading(item);
      } else {
        return btn.loading;
      }
    } else {
      return false;
    }
  }



  getBtnText = function (col: NgdsDataGridOpBtnOption, item: any) {
    if (typeof col.text === "function") {
      return col.text(item);
    } else {
      return col.text;
    }
  }


  getToolbarBtnStyle = function (btn: NgdsDataGridOpBtnOption) {
    if (btn.style) {
      if (typeof btn.style === "function") {
        return btn.style(null);
      } else {
        return btn["style"];
      }
    } else {
      return 'btn-primary';
    }
  }

  getValueFromPipe = function (item: any, col: NgdsDataGridColumnOption, pipe: PipeTransform | pipeFunc | PipeTransform[]) {
    if (pipe) {
      if (typeof pipe === "function") {
        return pipe(col.property, item);
      } else {
        if (Array.isArray(pipe)) {
          let value: any;
          for (let pipeItem of pipe) {
            if (typeof pipeItem === "function") {
              let pipeFunc: any = pipeItem;
              value = pipeFunc(col.property, item, value);
            } else {
              value = pipeItem.transform(col.property, item, value);
            }
          }
          return value;
        } else {
          return pipe.transform(col.property, item);
        }
      }
    } else {
      return item[col.property];
    }
  }

  reSearch(params: any) {
    this._pageIndex = 1;
    this.search(params);
  }

  search(params?: any) {
    this.searchParams.pageIndex = this._pageIndex;
    if (params) {
      Object.assign(this.searchParams, params);
    }

    let cachedParams:any = hashPageMap.get(this.hash);
    cachedParams.pageIndex = this._pageIndex;
    cachedParams.params = this.searchParams;

    this._loading = true;
    if (Array.isArray(this.option.dataSource)) {
      this._loading = false;
      this.data = this.option.dataSource;
      this.initTreeData();
    } else {
      this.option.dataSource.getData(this.searchParams).then((model: NgdsDataGridModel) => {
        this._loading = false;
        this.data = model.data;
        this.page = model.page;
        this.initTreeData();
      }).catch((e) => {
        this._loading = false;
      });
    }

  }

  expandDataCache: any;
  originDataCache: any;
  addNodeChildren(item: any, children: Array<any>) {
    if (!item.children && children.length) {
      item.children = children;
      item.expand = true;
      this.initTreeData();
    }
  }
  initTreeData() {
    this.option.dataKey = this.option.dataKey || "id";
    this.expandDataCache = {}
    this.originDataCache = {}
    this.data.forEach(item => {
      this.expandDataCache[item[this.option.dataKey]] = this.convertTreeToList(item);
    });
  }
  convertTreeToList(root: any) {
    const stack: any = [], array: any = [], hashMap: any = {};
    stack.push({ ...root, level: 0, expand: (root.expand || false) });
    this.originDataCache[root[this.option.dataKey]] = root;

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          let child = node.children[i];
          stack.push({ ...child, level: node.level + 1, expand: (child.expand || false), parent: node });
          this.originDataCache[child[this.option.dataKey]] = child;
        }
      }
    }

    return array;
  }

  visitNode(node: any, hashMap: any, array: any) {
    if (!hashMap[node[this.option.dataKey]]) {
      hashMap[node[this.option.dataKey]] = true;
      array.push(node);
    }
  }
  collapse(array: any, data: any, $event: any) {
    if ($event === false) {
      this.originDataCache[data[this.option.dataKey]].expand = false;
      if (data.children) {
        data.children.forEach((d: any) => {
          const target = array.find((a: any) => a[this.option.dataKey] === d[this.option.dataKey]);
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
      }
    } else {
      this.option.table.expandChange && this.option.table.expandChange(this.originDataCache[data[this.option.dataKey]], $event);
    }
  }

  ngAfterContentChecked() {
  }

  _checkAll(value: any) {
    if (value) {
      this.data.forEach((data: any) => {
        if (!data.disabled) {
          data.checked = true;
        }
      });
    } else {
      this.data.forEach(data => data.checked = false);
    }
    this._refreshStatus();
  };

  _refreshStatus() {
    const allChecked = this.data.every(value => value.disabled || value.checked);
    const allUnChecked = this.data.every(value => value.disabled || !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
    let checkedArray: Array<any> = [];
    this.data.forEach((item: any) => {
      if (item.checked) {
        checkedArray.push(item);
      }
    });
    this.checkboxChange.emit(checkedArray);
  };

  _sort(sortName: string, value: any) {
  }
}
