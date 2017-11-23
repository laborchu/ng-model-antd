import {
  Component,
  AfterContentChecked,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  Input
} from '@angular/core';
import { NgdsFormConfig, NgdsFormSelectCompOption } from './form.config';
import { NgdsModel } from '../core/datasource';
import { NgdsFormComp } from './form.component';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'ngds-form-select',
  template: `
  <div nz-col [nzSpan]="option.span" *ngIf="!option.hidden">
    <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="option.labelSpan">
            <label for="{{option.property}}">{{option.label}}</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="option.compSpan" [nzValidateStatus]="getFormControl(option.property)">
            <nz-select [formControl]="getFormControl(option.property)" 
            [(ngModel)]="option.value"
            (ngModelChange)="onChange($event)"
            [nzSize]="'large'" 
            [nzMode]="option.model">
              <nz-option *ngFor="let item of data" [nzLabel]="item[option.dsLabel]" [nzValue]="item[option.dsValue]"></nz-option>
            </nz-select>

            <div nz-form-explain *ngFor="let val of option.validations">
                <span class="error-msg" *ngIf="getFormControl(option.property).errors&&
                getFormControl(option.property).errors[val.type]">{{val.msg}}</span>
            </div>

        </div>
    </div>
  </div>
  `
})
export class NgdsFormSelect extends NgdsFormComp implements AfterContentChecked {
  constructor() {
    super();
  }

  option: NgdsFormSelectCompOption;
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
    })
  }

  onChange(event:any){
    this.option.onChange && this.option.onChange(this.option);
  }

  ngAfterContentChecked() {
  }

  getFormControl(name:string):any{
    return this.option.formGroup.controls[ name ];
  }
}
