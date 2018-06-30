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
        <div nz-form-item nz-row>
            <div nz-form-label nz-col [nzSpan]="option.labelSpan">
                <label for="{{option.property}}">{{option.label}}</label>
            </div>
            <div nz-form-control nz-col [nzSpan]="option.compSpan" [nzValidateStatus]="getFormControl(option.property)">
                <nz-datepicker [formControl]="getFormControl(option.property)" 
                [(ngModel)]="option.value"
                [nzShowTime]="option.showTime"
                [nzFormat]="option.showTime?option.format:'YYYY-MM-DD'"
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
export class NgdsFormDatePicker extends NgdsFormComp implements AfterContentChecked {
    constructor() {
        super();
    }

    option: NgdsFormDatePickerCompOption;
    data: Array<any>;

    ngOnInit() {
        this.option.value = this.option.value || null;
    }

    ngAfterContentChecked() {
    }

    onChange(value: any) {
        if (value !== undefined) {
            this.option.value = value;
        }
        
        if(this.option.validations){
            for(let val of this.option.validations){
                if(val.type=="required"){
                    let formControl = this.option.formGroup.controls[this.option.property];
                    if(!this.option.value){
                        formControl.setErrors({"required":true})
                    }else{
                        if(formControl.errors){
                            delete formControl.errors["required"];
                        }
                    }
                    if(formControl.errors&&Object.keys(formControl.errors).length==0){
                        formControl.setErrors(null);
                    }
                }
            }
        }

        this.option.onChange && this.option.onChange(this.option);
    }

    getFormControl(name: string): any {
        return this.option.formGroup.controls[name];
    }

}
