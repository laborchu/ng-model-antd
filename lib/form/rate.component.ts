import { AfterContentChecked, Component, ViewChild } from '@angular/core';
import { NzRadioGroupComponent } from 'ng-zorro-antd';
import { NgdsFormComp } from './form.component';
import { NgdsFormRadioCompOption, NgdsFormRateCompOption } from './form.config';

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
        <nz-rate 
        [ngModel]="option.value"
        (ngModelChange)="setValue($event);onChange()"
        >
        </nz-rate>
        
        <div class="form-item-tip" *ngIf="option.tip">{{option.tip}}</div>
        <div nz-form-explain *ngFor="let val of option.validations">
            <span class="error-msg" *ngIf="getFormControl(option.property).errors&&
            getFormControl(option.property).errors[val.type]">{{val.msg}}</span>
        </div>

      </nz-form-control>
    </nz-form-item>
  </div>
  `
})
export class NgdsFormRate extends NgdsFormComp implements AfterContentChecked {
  constructor() {
    super();
  }
  option: NgdsFormRateCompOption;
  data: Array<any>;
  oldValue: any;

  ngOnInit() {
    this.option.onChange && this.option.onChange(this.option);
  }

  setValue(value: any) {
    if(this.oldValue==undefined){
      this.oldValue = value || null;
    }
    this.option.value = value;
  }

  onChange() {
    debugger
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
