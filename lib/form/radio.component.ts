import {
  Component,
  AfterContentChecked,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  Input
} from '@angular/core';
import { NgdsFormConfig, NgdsFormRadioCompOption } from './form.config';
import { NgdsModel } from '../core/datasource';
import { NgdsFormComp } from './form.component';
import { NzRadioGroupComponent } from 'ng-zorro-antd';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'ngds-form-radio',
  template: `
  <div nz-col [nzSpan]="option.span" *ngIf="!option.hidden">
    <nz-form-item  nz-row>
      <nz-form-label nz-col [nzSpan]="option.labelSpan">
      {{option.label}}
      </nz-form-label>
      <nz-form-control nz-col [nzSpan]="option.compSpan" [nzValidateStatus]="getFormControl(option.property)">
        <nz-radio-group #group
        [formControl]="getFormControl(option.property)"
        [(ngModel)]="option.value"
        (ngModelChange)="onChange()">
          <label nz-radio [nzDisabled]="option.disabled" [nzValue]="item.value" *ngFor="let item of data">
            <span>{{item.label}}</span>
          </label>
        </nz-radio-group>
        <div nz-form-explain *ngFor="let val of option.validations">
            <span class="error-msg" *ngIf="getFormControl(option.property).errors&&
            getFormControl(option.property).errors[val.type]">{{val.msg}}</span>
        </div>

      </nz-form-control>
    </nz-form-item>
  </div>
  `
})
export class NgdsFormRadio extends NgdsFormComp implements AfterContentChecked {
  constructor() {
    super();
  }
  @ViewChild('group') group: NzRadioGroupComponent;

  option: NgdsFormRadioCompOption;
  data: Array<any>;
  oldValue: any;
  ngOnInit() {
    if (!this.option.dsLabel) {
      this.option.dsLabel = "label";
    }
    if (!this.option.dsValue) {
      this.option.dsValue = "value";
    }
    if (Array.isArray(this.option.dataSource)) {
      this.data = this.option.dataSource;
    } else {
      this.option.dataSource.getData({}).then((data: Array<any>) => {
        this.data = data;
        if (this.option.value != undefined) {
          setTimeout(() => {
            this.group.writeValue(this.option.value);
          }, 10)
        }
      });
    }
    this.option.onChange && this.option.onChange(this.option);
  }

  setValue(value: any) {
    if(this.oldValue==undefined){
      this.oldValue = value || null;
    }
    this.option.value = value;
  }

  onChange() {
    this.option.onChange && this.option.onChange(this.option);
  }

  getChangeValue(): any {
    if (this.oldValue === this.option.value) {
      return null;
    } else {
      return {
        oldValue: this.oldValue,
        newValue: this.option.value
      }
    }
  }

  ngAfterContentChecked() {
  }

  getFormControl(name: string): any {
    return this.option.formGroup.controls[name];
  }
}
