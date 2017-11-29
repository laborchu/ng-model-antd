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

                <nz-datepicker style="width:45%" [formControl]="getFormControl(option.property)" 
                [(ngModel)]="option.value.first"
                (ngModelChange)="onChange()"
                [nzSize]="'large'">
                </nz-datepicker>

                <span class="split-input">-</span>

                <nz-datepicker style="width:45%" [formControl]="getFormControl(option.property2)" 
                [(ngModel)]="option.value.second"
                (ngModelChange)="onChange()"
                [nzSize]="'large'">
                </nz-datepicker>

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

    ngOnInit() {
        if (!this.option.value) {
            this.option.value = {};
        }
    }

    ngAfterContentChecked() {
    }

    onChange(value: any) {
        if (value !== undefined) {
            this.option.value = value;
        }
        this.option.onChange && this.option.onChange(this.option);
    }

    setCompValue(formValue: any, compKey: string, compValue: any): void {
        formValue[this.option.property] = this.option.value.first;
        formValue[this.option.property2] = this.option.value.second;
    }

    getFormControl(name: string): any {
        return this.option.formGroup.controls[name];
    }

}
