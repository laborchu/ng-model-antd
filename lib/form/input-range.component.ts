import {
  Component,
  AfterContentChecked,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  Input
} from '@angular/core';
import { NgdsFormConfig, NgdsFormInputRangeCompOption } from './form.config';
import { NgdsFormComp } from './form.component';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'ngds-form-range',
  template: `
  <div nz-col [nzSpan]="option.span" *ngIf="!option.hidden" class="input-range">
    <nz-form-item  nz-row>
      <nz-form-label nz-col [nzSpan]="option.labelSpan" >
      {{option.label}}
      </nz-form-label>
      <nz-form-control nz-col [nzSpan]="option.compSpan" [nzValidateStatus]="getFormControl(option.property)">

        <nz-input-number
          [(ngModel)]="option.value.first"
          (ngModelChange)="onChange()"
          [formControl]="getFormControl(option.property)"></nz-input-number>
        <span class="split-input">-</span>
        <nz-input-number
          [(ngModel)]="option.value.second"
          (ngModelChange)="onChange()"
          [formControl]="getFormControl(option.property2)"></nz-input-number>

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
export class NgdsFormInputRange extends NgdsFormComp implements AfterContentChecked {
  constructor() {
    super();
  }

  option: NgdsFormInputRangeCompOption;
  oldValue: any;

  setValue(value: any) {
    if (value !== undefined) {
      this.option.value = value;
    }
    if (this.oldValue == undefined) {
      this.oldValue = value ? Object.assign({}, value) : null;
    }
  }

  onChange() {
    this.option.onChange && this.option.onChange(this.option);
  }

  ngOnInit() {
    if (!this.option.value) {
      this.option.value = {};
    }
  }

  setCompValue(formValue: any, compKey: string, compValue: any): void {
    formValue[this.option.property] = this.option.value && this.option.value.first;
    formValue[this.option.property2] = this.option.value && this.option.value.second;
  }

  ngAfterContentChecked() {
  }

  getFormControl(name: string): any {
    return this.option.formGroup.controls[name];
  }

  getChangeValue(): any {
    if (this.oldValue || this.option.value) {
      if (this.oldValue && this.option.value) {
        if (this.option.value.first == this.oldValue.first &&
          this.option.value.second == this.oldValue.second) {
          return null;
        } else {
          return {
            oldValue: this.oldValue,
            newValue: this.option.value
          }
        }
      } else {
        return {
          oldValue: this.oldValue,
          newValue: this.option.value
        }
      }
    } else {
      return null;
    }
  }
}
