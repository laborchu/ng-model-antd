import { AfterContentChecked, Component } from '@angular/core';
import { NgdsFormComp } from './form.component';
import { NgdsFormSelectCompOption } from './form.config';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'ngds-form-select',
  template: `
  <div nz-col [nzSpan]="option.span" *ngIf="!option.hidden">
    <nz-form-item nz-row>
        <nz-form-label nz-col [nzSpan]="option.labelSpan">
        {{option.label}}
        </nz-form-label>
        <nz-form-control nz-col [nzSpan]="option.compSpan" [nzValidateStatus]="getFormControl(option.property)">
            <nz-select [formControl]="getFormControl(option.property)" [nzPlaceHolder]="option.placeHolder || '请选择'"
            [(ngModel)]="option.value"
            (ngModelChange)="onChange()"
            (nzOnSearch)="searchChange($event)"
            nzShowSearch
            nzAllowClear
            [nzServerSearch]="option.searchRemote"
            [nzDisabled]="option.disabled"
            [nzMode]="option.model || 'default' ">
              <ng-container *ngFor="let item of data">
                <nz-option [nzLabel]="item[option.dsLabel]" [nzValue]="item[option.dsValue]"></nz-option>
              </ng-container>
            </nz-select>

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
export class NgdsFormSelect extends NgdsFormComp implements AfterContentChecked {
  constructor() {
    super();
  }

  option: NgdsFormSelectCompOption;
  data: Array<any> = [];
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
      this.option.dataSource.getData({}).then((model: any) => {
        this.data = model.data || [];
      })
    }

  }

  setValue(value: any) {
    if (value !== undefined) {
      this.option.value = value;
    }

    if (this.oldValue == undefined) {
      this.oldValue = value || null;
    }

    if (this.option.searchRemote && !Array.isArray(this.option.dataSource)) {
      let params: any = {};
      params[this.option.dsValue] = value;
      this.option.dataSource.getData(params).then((model: any) => {
        this.data = model.data || [];
      })
    }
  }

  searchTimeout: any;
  searchChange($event: any) {
    if (this.option.searchRemote) {
      if (!Array.isArray(this.option.dataSource)) {
        if (this.searchTimeout) {
          clearTimeout(this.searchTimeout);
        }
        if ($event) {
          this.searchTimeout = setTimeout(() => {
            this.searchTimeout = null;
            this.option.dataSource.getData({ keywords: $event }).then((model: any) => {
              this.data = model.data || [];
            })
          }, 500);
        } else {
          this.data = [];
        }
      }
    }
  }

  onChange() {
    if (this.option.onChange) {
      let dataValue: any = null;
      if (this.data) {
        if (this.option.model == "multiple") {
          dataValue = [];
          this.data.forEach((data: any) => {
            this.option.value && this.option.value.every((value: any) => {
              if (data[this.option.dsValue] == value) {
                dataValue.push(data);
                return false;
              }
              return true;
            })
          })
        } else {
          this.data.every((data: any) => {
            if (data[this.option.dsValue] == this.option.value) {
              dataValue = data;
              return false;
            }
            return true;
          })
        }

      }
      this.option.onChange(this.option, dataValue);
    }
  }

  ngAfterContentChecked() {
  }

  getFormControl(name: string): any {
    return this.option.formGroup.controls[name];
  }

  getChangeValue(): any {
    if (this.option.model == "multiple") {
      if (this.oldValue || this.option.value) {
        if (this.oldValue && this.option.value) {
          if (this.oldValue.every((e: any) => this.option.value.includes(e)) && this.oldValue.length == this.option.value.length) {
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
    } else {
      if (this.oldValue === this.option.value) {
        return null;
      } else {
        return {
          oldValue: this.oldValue,
          newValue: this.option.value
        }
      }
    }

  }
}
