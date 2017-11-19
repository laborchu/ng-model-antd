import {
  Component,
  AfterContentChecked,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  Input
} from '@angular/core';
import { NgdsFormConfig, NgdsFormRadioCompOption } from './form.config';
import { NgdsDsModel } from '../core/datasource';
import { NgdsFormComp } from './form.component';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'ngds-form-radio',
  template: `
  <div nz-col [nzSpan]="option.span">
    <div nz-form-item nz-row>
      <div nz-form-label nz-col [nzSpan]="4">
        <label for="{{option.property}}">{{option.label}}</label>
      </div>
      <div nz-form-control nz-col [nzSpan]="20" [nzValidateStatus]="getFormControl(option.property)">
        <nz-radio-group [formControl]="getFormControl(option.property)">
          <label nz-radio [nzValue]="item.value" *ngFor="let item of data">
            <span>{{item.label}}</span>
          </label>
        </nz-radio-group>
        <div nz-form-explain *ngFor="let val of option.validations">
            <span class="error-msg" *ngIf="getFormControl(option.property).errors&&
            getFormControl(option.property).errors[val.type]">{{val.msg}}</span>
        </div>

      </div>
    </div>
  </div>
  `
})
export class NgdsFormRadio extends NgdsFormComp implements AfterContentChecked {
  constructor() {
    super();
  }

  option: NgdsFormRadioCompOption;
  data: Array<any>;

  ngOnInit() {
    if(!this.option.dsLabel){
        this.option.dsLabel = "label";
    }
    if(!this.option.dsValue){
        this.option.dsValue = "value";
    }
    this.option.dataSource.getData({}).then((data: Array<any>) => {
      this.data = data;
    });
    this.onChange();
  }

  onChange(){
    this.option.onChange&&this.option.onChange(this.option);
  }

  ngAfterContentChecked() {
  }

  getFormControl(name:string):any {
    return this.option.formGroup.controls[ name ];
  }
}
