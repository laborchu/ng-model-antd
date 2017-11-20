import {
    Component,
    AfterContentChecked,
    ViewContainerRef,
    ViewChild,
    ComponentFactoryResolver,
    Injectable,
    Input
} from '@angular/core';
import {NgdsFormConfig,NgdsFormDatePickerCompOption} from './form.config';
import {NgdsFormComp} from './form.component';
import {NgdsModel} from '../core/datasource';


/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngds-form-date',
    template: `
    <div nz-col [nzSpan]="option.span">
        <div nz-form-item nz-row>
            <div nz-form-label nz-col [nzSpan]="option.labelSpan">
                <label for="{{option.property}}">{{option.label}}</label>
            </div>
            <div nz-form-control nz-col [nzSpan]="option.compSpan" [nzValidateStatus]="getFormControl(option.property)">
                <nz-datepicker [formControl]="getFormControl(option.property)" 
                [(ngModel)]="option.value"
                (ngModelChange)="change($event)"
                [nzSize]="'large'">
                </nz-datepicker>

                <div nz-form-explain *ngFor="let val of option.validations">
                    <span class="error-msg" *ngIf="getFormControl(option.property).dirty&&
                    getFormControl(option.property).errors&&
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
    }

    ngAfterContentChecked() {
    }

    change($event:any){
        this.option.onChange && this.option.onChange(this.option);
    }

    getFormControl(name:string):any {
        return this.option.formGroup.controls[ name ];
    }
    
}
