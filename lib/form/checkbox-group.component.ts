import { AfterContentChecked, Component } from '@angular/core';
import { NgdsFormComp } from './form.component';
import { NgdsFormCheckboxGroupCompOption } from './form.config';


/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngds-form-checkbox',
    template: `
    <div nz-col [nzSpan]="option.span" *ngIf="!option.hidden">
        <nz-form-item nz-row>
            <nz-form-label nz-col [nzSpan]="option.labelSpan">
            {{option.label}}
            </nz-form-label>
            <nz-form-control nz-col [nzSpan]="option.compSpan">
                <div *ngFor="let group of data; let i = index">
                    <div>
                        <label nz-checkbox [(ngModel)]="allChecked[i]" (ngModelChange)="updateAllChecked(i)" [nzIndeterminate]="indeterminate">
                        {{group.title}}
                        </label>
                    </div>
                    <nz-checkbox-group [(ngModel)]="group.children" (ngModelChange)="setValue();onChange()"></nz-checkbox-group>
                </div>
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
export class NgdsFormCheckboxGroup extends NgdsFormComp implements AfterContentChecked {
    constructor() {
        super();
    }

    option: NgdsFormCheckboxGroupCompOption;
    data: Array<any>;
    indeterminate = true;
    allChecked: any = {};
    oldValue: any;

    ngOnInit() {
        if (!this.option.dsLabel) {
            this.option.dsLabel = "label";
        }
        if (!this.option.dsValue) {
            this.option.dsValue = "value";
        }
        if (!this.option.dsTitle) {
            this.option.dsTitle = "title";
        }
        if (Array.isArray(this.option.dataSource)) {
            this.processData(this.option.dataSource);
        }else{
            this.option.dataSource && this.option.dataSource.getData({}).then((model: any) => {
                this.processData(model.data);
            })
        }
        
    }

    processData(dataArray:any){
        for (let item of dataArray) {
            item.title = item[this.option.dsTitle];
            for (let child of item.children) {
                child.label = child[this.option.dsLabel];
                if (this.option.dsLabel != "label") {
                    delete child[this.option.dsLabel];
                }
                child.value = child[this.option.dsValue];
                if (this.option.dsValue != "value") {
                    delete child[this.option.dsValue];
                }
                if (this.option.value != undefined) {
                    if (this.option.value.indexOf(child[this.option.dsValue]) != -1) {
                        child.checked = true;
                    }
                }
            }
        }
        this.data = dataArray;
    }

    updateAllChecked(index: number): void {
        this.indeterminate = false;
        if (this.allChecked[index]) {
            this.data[index].children.forEach((item: any) => item.checked = true);
        } else {
            this.data[index].children.forEach((item: any) => item.checked = false);
        }
        this.setValue(undefined);
        this.onChange();
    }

    setValue(value: any) {
        if (value === undefined) {
            this.option.value = [];
            for (let item of this.data) {
                for (let child of item.children) {
                    if (child.checked) {
                        this.option.value.push(child.value);
                    }
                }
            }
        } else {
            this.option.value = value || [];
            for (let item of this.data) {
                for (let child of item.children) {
                    if (this.option.value.indexOf(child.value) != -1) {
                        child.checked = true;
                    } else {
                        child.checked = false;
                    }
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

        if (this.oldValue == undefined) {
            this.oldValue = value || null;
        }
    }

    onChange() {
        this.option.onChange && this.option.onChange(this.option);
    }

    ngAfterContentChecked() {
    }

    getFormControl(name: string): any {
        return this.option.formGroup.controls[name];
    }

    getChangeValue(): any {
        if (this.oldValue || this.option.value) {
            if (this.oldValue && this.option.value) {
                if (this.oldValue.every((e: any) => this.option.value.includes(e))) {
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
