import {
  Component,
  AfterContentChecked,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  Input
} from '@angular/core';
import { NgdsFormConfig, NgdsFormCascaderCompOption } from './form.config';
import { NgdsFormComp } from './form.component';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'ngds-form-cascader',
  template: `
  <div nz-col [nzSpan]="option.span" *ngIf="!option.hidden">
    <div nz-form-item nz-row>
      <div nz-form-label nz-col [nzSpan]="option.labelSpan" >
        <label for="{{option.property}}">{{option.label}}</label>
      </div>
      <div nz-form-control nz-col [nzSpan]="option.compSpan">
        <nz-cascader
            [nzPlaceHolder]="option.placeHolder || '请输入'"
            [nzValueProperty]="option.dsValue"
            [nzLabelProperty]="option.dsLabel"
            [(ngModel)]="option.value"
            (nzSelectionChange)="onChange($event)"
            (nzLoad)="loadData($event)"
            [formControl]="getFormControl(option.property)">
            
        </nz-cascader>
        <div nz-form-explain *ngFor="let val of option.validations">
            <span class="error-msg" *ngIf="getFormControl(option.property).errors&&
            getFormControl(option.property).errors[val.type]">{{val.msg}}</span>
        </div>

      </div>
    </div>
  </div>
  `
})
export class NgdsFormCascader extends NgdsFormComp implements AfterContentChecked {
  constructor() {
    super();
  }

  option: NgdsFormCascaderCompOption;

  onChange(value: any) {
    this.option.value = value;
    this.option.onChange && this.option.onChange(this.option);
  }

  ngOnInit() {
    if (!this.option.dsLabel) {
      this.option.dsLabel = "label";
    }
    if (!this.option.dsValue) {
      this.option.dsValue = "value";
    }
  }

  ngAfterContentChecked() {
  }

  loadData(e: { option: any, index: number, resolve: Function, reject: Function }): void {
    if (e.option) {
      e.option.loading = true;
    }
    if (Array.isArray(this.option.dataSource)) {
      if (e.option) {
        e.option.loading = false;
      }
      e.resolve(this.option.dataSource);
    } else {
      this.option.dataSource.getData({ "index": e.index, "parentId": e.option ? e.option[this.option.dsValue] : 0 }).then((value: any) => {
        if (e.option) {
          e.option.loading = false;
        }
        e.resolve(value.data);
      })
    }
  }

  setCompValue(formValue: any, compKey: string, compValue: any): void {
    if (this.option.value && this.option.value.length) {
      let valueArray: Array<any> = [];
      for (let v of this.option.value) {
        delete v.children;
        delete v.loading;
        delete v.isLeaf;
        delete v.parent;
      }
    }
    formValue[this.option.property] = this.option.value;
  }

  getFormControl(name: string): any {
    return this.option.formGroup.controls[name];
  }

}
