import {
    Component,
    AfterContentChecked,
    ViewContainerRef,
    ViewChild,
    ComponentFactoryResolver,
    Input
} from '@angular/core';
import { NgdsFormConfig, NgdsFormCheckboxCompOption } from './form.config';
import { NgdsDsModel } from '../core/datasource';
import { NgdsFormComp } from './form.component';


/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngds-form-checkbox',
    template: `
    <div nz-col [nzSpan]="option.span">
        <div nz-form-item nz-row>
        <div nz-form-label nz-col [nzSpan]="4">
            <label for="{{option.property}}">{{option.label}}</label>
        </div>
        <div nz-form-control nz-col [nzSpan]="20" [nzValidateStatus]="getFormControl(option.property)">
            <label nz-checkbox *ngFor="let item of data" [formControl]="getFormControl(option.property)">
                <span>{{item.label}}</span>
            </label>
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

    ngOnInit() {
        if (!this.option.dsLabel) {
            this.option.dsLabel = "label";
        }
        if (!this.option.dsValue) {
            this.option.dsValue = "value";
        }
        this.option.dataSource.getData({}).then((data: Array<any>) => {
            this.data = data;
        })
    }

    change(event: any) {
        if (!this.option.value) {
            this.option.value = [];
        }
        if (event) {
            let data = this.option.value;
            if (event.currentTarget.checked) {
                data.push(event.currentTarget.value);
            } else {
                data.splice(data.indexOf(event.currentTarget.value), 1);
            }
        }
        if (this.option.validations) {
            for (let val of this.option.validations) {
                if (val.type == "required") {
                    if (this.option.value.length == 0) {
                        let formControl = this.option.formGroup.controls[this.option.property];
                        formControl.setErrors({ "required": true })
                    }
                }
            }
        }
        this.option.onChange && this.option.onChange(this.option);
    }

    checked(value: any): boolean {
        if (!this.option.value) {
            return false;
        }
        return this.option.value.indexOf(value) != -1;
    }

    ngAfterContentChecked() {
    }

    getFormControl(name: string):any {
        return this.option.formGroup.controls[name];
    }
}
