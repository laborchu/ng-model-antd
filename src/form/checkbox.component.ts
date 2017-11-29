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
                <label for="{{option.property}}">{{option.label}}</label>
            </div>
            <div nz-form-control nz-col [nzSpan]="option.compSpan">
                <nz-checkbox-group [(ngModel)]="data" (ngModelChange)="onChange()"></nz-checkbox-group>
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
            if (this.option.value != undefined) {
                for (let item of data) {
                    if (this.option.value.indexOf(item.value) != -1) {
                        item.checked = true;
                    }
                }
            }
            this.data = data;
        })
    }

    onChange(value:any) {
        if(value===undefined){
            this.option.value = [];
            for (let item of this.data) {
                if (item.checked) {
                    this.option.value.push(item.value);
                }
            }
        }else{
            this.option.value = value||[];
            for (let item of this.data) {
                if (this.option.value.indexOf(item.value)!=-1) {
                    item.checked = true;
                }else{
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
        }
        this.option.onChange && this.option.onChange(this.option);
    }

    ngAfterContentChecked() {
    }

    getFormControl(name: string): any {
        return this.option.formGroup.controls[name];
    }
}
