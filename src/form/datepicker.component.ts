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
import {NgdsDsModel} from '../core/datasource';


/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngds-form-date',
    template: `
    <div nz-col [nzSpan]="option.span">
        <div nz-form-item nz-row>
            <div nz-form-label nz-col [nzSpan]="4">
                <label for="{{option.property}}">{{option.label}}</label>
            </div>
            <div nz-form-control nz-col [nzSpan]="20" [nzValidateStatus]="getFormControl(option.property)">
                <nz-datepicker [formControl]="getFormControl(option.property)" [nzSize]="'large'">
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

    getFormControl(name:string):any {
        return this.option.formGroup.controls[ name ];
      }
    
}
