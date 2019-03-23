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
    selector: 'ngds-form-date',
    template: `
    <div nz-col [nzSpan]="option.span" *ngIf="!option.hidden">
        <nz-form-item nz-row>
            <nz-form-label nz-col [nzSpan]="option.labelSpan">
            {{option.label}}
            </nz-form-label>
            <nz-form-control nz-col [nzSpan]="option.compSpan" [nzValidateStatus]="getFormControl(option.property)">
                <nz-date-picker [formControl]="getFormControl(option.property)" 
                [(ngModel)]="option.value"
                [nzShowTime]="option.showTime"
                [nzFormat]="option.showTime?option.format:'yyy-MM-dd'"
                (ngModelChange)="onChange()">
                </nz-date-picker>
                
                <div class="form-item-tip" *ngIf="option.tip">{{option.tip}}</div>
                <div nz-form-explain *ngFor="let val of option.validations">
                    <span class="error-msg" *ngIf="getFormControl(option.property).errors&&
                    getFormControl(option.property).errors[val.type]">{{val.msg}}</span>
                </div>

            </nz-form-control>
        </nz-form-item>
    </div>
    `,

})
export class NgdsFormDatePicker extends NgdsFormComp implements AfterContentChecked {
    constructor() {
        super();
    }

    option: NgdsFormDatePickerCompOption;
    data: Array<any>;
    oldValue: any;

    ngOnInit() {
        this.option.value = this.option.value || null;
    }

    ngAfterContentChecked() {
    }

    setValue(value: any) {
        if (value !== undefined) {
            this.option.value = value;
        }

        if (this.oldValue == undefined) {
            this.oldValue = value || null;
        }
    }

    onChange() {
        if (this.option.validations) {
            let formControl = this.option.formGroup.controls[this.option.property];
            formControl.setErrors({});
            for (let val of this.option.validations) {
                if (val.type == "required") {
                    if (!this.option.value) {
                        formControl.setErrors({ "required": true })
                    } else {
                        if (formControl.errors) {
                            delete formControl.errors["required"];
                        }
                    }
                }
                if (formControl.errors && Object.keys(formControl.errors).length == 0) {
                    formControl.setErrors(null);
                }
            }
        }
        this.option.onChange && this.option.onChange(this.option);
    }

    getFormControl(name: string): any {
        return this.option.formGroup.controls[name];
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

}
