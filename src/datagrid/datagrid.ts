import {
  Component,
  AfterContentChecked,
  Input,
  EventEmitter,
  Output,
  PipeTransform
} from '@angular/core';
import { NgdsDataGridConfig, NgdsDataGridOption, NgdsDataGridOpBtnOption, pipeFunc,
  NgdsDataGridColumnOption, NgdsDataGridModel, NgdsDataGridPageModel } from './datagrid.config';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'ngds-datagrid',
  exportAs: 'ngdsDataGrid',
  template: `
    <nz-table #nzTable [nzDataSource]="data" [nzPageSize]="page?.pageSize" [nzIsPagination]="page?true:false"
            [nzTotal]="page?.pageCount" [nzLoading]="_loading" (nzPageIndexChange)="search()">
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
        <tr *ngFor="let item of data" nz-tbody-tr>
          <td nz-td [nzCheckbox]="option.table.showCheck" *ngIf="option.table.showCheck">
            <label nz-checkbox [nzDisabled]="item.disabled" [(ngModel)]="item.checked" (ngModelChange)="_refreshStatus($event)">
            </label>
          </td>
        
          <td *ngFor="let col of option.table.columns;"
              title="{{col.title? (item[col.property]):''}}">
              <nz-badge *ngIf="col.badgePipe" [nzStatus]="getValueFromPipe(item,col,col.badgePipe)"></nz-badge>
              <span [innerHTML]="getValueFromPipe(item,col,col.propertyPipe)"></span>
          </td>
          <td *ngIf="option.table.op" class="op-td">
              <span *ngFor="let btn of option.table.op.buttons;let btnIndex = index" >
                <span nz-table-divider *ngIf="btnIndex!=0"></span>
                <a [hidden]="btn.hidden?btn.hidden(item):false"
                      (click)="btn.action(item,dataIndex)"
                      class="{{getBtnStyle(btn,item)}}">
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
                    <a>{{gbtn.text}}</a>
                  </li>
                </ul>
              </nz-dropdown>

          </td>
        </tr>
      </tbody>
    </nz-table>

  `
})
export class NgdsDataGrid implements AfterContentChecked {
  constructor(config: NgdsDataGridConfig) {
  }

  @Input() option: NgdsDataGridOption;
  @Output() checkboxChange: EventEmitter<any> = new EventEmitter();
  
  page: NgdsDataGridPageModel;
  data: Array<any> = [];
  searchParams: any = {};
  _loading: boolean = false;

  _allChecked: boolean = false;
  _indeterminate = false;

  ngOnInit() {
    this.search();
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

  getValueFromPipe = function (item: any, col: NgdsDataGridColumnOption,pipe:PipeTransform | pipeFunc | PipeTransform[]) {
    if (pipe) {
      if (typeof pipe === "function") {
        return pipe(col.property, item);
      } else {
        if (Array.isArray(pipe)) {
          let value: any;
          for (let pipeItem of pipe) {
            if (typeof pipeItem === "function") {
              value = pipeItem(col.property, item, value);                          
            }else{
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

  search(params?:any) {
    if(params){
      Object.assign(this.searchParams, params);      
    }
    this._loading = true;
    this.option.dataSource.getData(this.searchParams).then((model: NgdsDataGridModel) => {
      this._loading = false;
      this.data = model.data;
      this.page = model.page;
      if(model.page){
        this.searchParams.pageIndex = model.page.pageIndex;        
      }
    });
  }

  goto(pageNum: number) {
    this.searchParams.pageIndex = pageNum;
    this.search();
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
    let checkedArray:Array<any> = [];
    this.data.forEach((item: any) => {
      if(item.checked){
        checkedArray.push(item);
      }
    });
    this.checkboxChange.emit(checkedArray);
  };

  _sort(sortName:string, value:any) {
  }
}
