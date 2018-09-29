import {
    Component,
    AfterContentChecked,
    ViewContainerRef,
    ViewChild,
    ComponentFactoryResolver,
    Injectable,
    Input
} from '@angular/core';
import { NgdsFormConfig, NgdsFormDatePickerCompOption } from './form.config';
import { NgdsFormComp } from './form.component';
import { NgdsModel } from '../core/datasource';


/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngds-form-date-range',
    template: `
    <div nz-col [nzSpan]="option.span" *ngIf="!option.hidden">
        <div nz-form-item nz-row>
            <div nz-form-label nz-col [nzSpan]="option.labelSpan">
                <label for="{{option.property}}">{{option.label}}</label>
            </div>
            <div nz-form-control nz-col [nzSpan]="option.compSpan" [nzValidateStatus]="getFormControl(option.property)">
                <nz-rangepicker [(ngModel)]="option.value" 
                (ngModelChange)="onChange()" 
                [nzShowTime]="option.showTime"
                [nzFormat]="option.showTime?option.format:'YYYY-MM-DD'"
                [style.width.%]="100"></nz-rangepicker>
                <div nz-form-explain *ngFor="let val of option.validations">
                    <span class="error-msg" *ngIf="getFormControl(option.property).errors&&
                    getFormControl(option.property).errors[val.type]">{{val.msg}}</span>
                </div>

            </div>
        </div>
    </div>
    `,

})
export class NgdsFormDatePickerRange extends NgdsFormComp implements AfterContentChecked {
    constructor() {
        super();
    }

    option: NgdsFormDatePickerCompOption;
    data: Array<any>;
    oldValue: any;

    ngOnInit() {
    }

    ngAfterContentChecked() {
    }

    setValue(value: any) {
        if (value !== undefined) {
            this.option.value = value;
        }

        if (this.oldValue == undefined) {
            this.oldValue = value ? [value[0],value[1]] : null;
        }
    }

    onChange() {
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
        this.option.onChange && this.option.onChange(this.option);
    }

    getFormControl(name: string): any {
        return this.option.formGroup.controls[name];
    }

    getChangeValue(): any {
        if (this.oldValue || this.option.value) {
            if (this.oldValue && this.option.value) {
                if (this.option.value[0] == this.oldValue[0] &&
                    this.option.value[1] == this.oldValue[1]) {
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
