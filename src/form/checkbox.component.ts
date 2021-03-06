import {
    Component,
    AfterContentChecked,
    ViewContainerRef,
    ViewChild,
    ComponentFactoryResolver,
    Input
} from '@angular/core';
import { NgdsFormConfig, NgdsFormCheckboxCompOption } from './form.config';
import { NgdsModel } from '../core/datasource';
import { NgdsFormComp } from './form.component';


/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngds-form-checkbox',
    template: `
    <div nz-col [nzSpan]="option.span" *ngIf="!option.hidden">
        <div nz-form-item nz-row>
            <div nz-form-label nz-col [nzSpan]="option.labelSpan">
                <label for="{{option.property}}">
                    <span *ngIf="option.showAllChecked" nz-checkbox [(ngModel)]="allChecked" (ngModelChange)="updateAllChecked()">
                    </span>
                    {{option.label}}
                </label>
            </div>
            <div nz-form-control nz-col [nzSpan]="option.compSpan">
                <nz-checkbox-group [(ngModel)]="data" (ngModelChange)="setValue();onChange()" [nzDisabled]="option.disabled"></nz-checkbox-group>
                <div nz-form-explain *ngFor="let val of option.validations">
                    <span class="error-msg" *ngIf="getFormControl(option.property).errors&&
                    getFormControl(option.property).errors[val.type]">{{val.msg}}</span>
                </div>
            </div>
        </div>
    </div>
    `
})
export class NgdsFormCheckbox extends NgdsFormComp implements AfterContentChecked {
    constructor() {
        super();
    }

    option: NgdsFormCheckboxCompOption;
    data: Array<any>;
    allChecked = false;
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
            this.option.data = this.data;
        } else {
            this.option.dataSource.getData({}).then((model: any) => {
                for (let item of model.data) {
                    item.label = item[this.option.dsLabel];
                    if (this.option.dsLabel != "label") {
                        // delete item[this.option.dsLabel];
                    }
                    item.value = item[this.option.dsValue];
                    if (this.option.dsValue != "value") {
                        // delete item[this.option.dsValue];
                    }
                    if (this.option.value != undefined) {
                        if (this.option.value.indexOf(item.value) != -1) {
                            item.checked = true;
                        }
                    }
                }

                this.data = model.data;
                this.option.data = this.data;
            })
        }


    }

    updateAllChecked() {
        if (this.allChecked) {
            this.data.forEach(item => item.checked = true);
        } else {
            this.data.forEach(item => item.checked = false);
        }
        this.setValue(undefined);
        this.onChange();
    }

    setValue(value: any) {
        if (value === undefined) {
            this.option.value = [];
            for (let item of this.data) {
                if (item.checked) {
                    this.option.value.push(item.value);
                }
            }
        } else {
            this.option.value = value || [];
            for (let item of this.data) {
                if (this.option.value.indexOf(item.value) != -1) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            }
        }


        if (this.option.validations) {
            let formControl = this.option.formGroup.controls[this.option.property];
            formControl.setErrors({});
            for (let val of this.option.validations) {
                if (val.type == "required") {
                    if (this.option.value.length == 0) {
                        let formControl = this.option.formGroup.controls[this.option.property];
                        formControl.setErrors({ "required": true })
                    }
                }
            }
            if (formControl.errors && Object.keys(formControl.errors).length == 0) {
                formControl.setErrors(null);
            }
        }
        
        if(this.oldValue==undefined){
          this.oldValue = value || null;
        }
    }

    onChange() {
        this.option.onChange && this.option.onChange(this.option);
    }

    getChangeValue(): any {
        if (this.oldValue || this.option.value) {
            if (this.oldValue && this.option.value) {
                if (this.oldValue.every((e:any) => this.option.value.includes(e))&&this.oldValue.length==this.option.value.length) {
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

    ngAfterContentChecked() {
    }

    getFormControl(name: string): any {
        return this.option.formGroup.controls[name];
    }
}
