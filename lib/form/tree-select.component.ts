import {
    Component,
    AfterContentChecked,
    ViewContainerRef,
    ViewChild,
    ComponentFactoryResolver,
    Injectable,
    Input
} from '@angular/core';
import { NgdsFormConfig, NgdsFormDatePickerCompOption, NgdsFormTreeSelectCompOption } from './form.config';
import { NgdsFormComp } from './form.component';
import { NgdsModel } from '../core/datasource';
import { NzFormatEmitEvent, NzTreeSelectComponent } from 'ng-zorro-antd';


/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngds-tree-select',
    template: `
    <div nz-col [nzSpan]="option.span" *ngIf="!option.hidden">
        <nz-form-item nz-row>
            <nz-form-label nz-col [nzSpan]="option.labelSpan">
            {{option.label}}
            </nz-form-label>
            <nz-form-control nz-col [nzSpan]="option.compSpan" [nzValidateStatus]="getFormControl(option.property)">
                <nz-tree-select
                    #treeSelect
                    [nzPlaceHolder]="option.placeHolder || '请输入'"
                    [(ngModel)]="option.value"
                    [nzAsyncData]="option.asyncData"
                    [nzNodes]="data"
                    [nzCheckable]="option.checkable"
                    [nzDropdownStyle]="{ 'max-height': '300px' }"
                    (ngModelChange)="onChange()"
                    (nzExpandChange)="loadData($event)">
                </nz-tree-select>

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
export class NgdsFormTreeSelect extends NgdsFormComp implements AfterContentChecked {
    constructor() {
        super();
    }

    option: NgdsFormTreeSelectCompOption;
    data: Array<any> = [];
    oldValue: any;
    @ViewChild("treeSelect", { static: false }) treeSelect: NzTreeSelectComponent;

    ngOnInit() {
        this.option.value = this.option.value || null;

        if (!this.option.dsLabel) {
            this.option.dsLabel = "title";
        }
        if (!this.option.dsValue) {
            this.option.dsValue = "key";
        }

        if (Array.isArray(this.option.dataSource)) {
            this.data = this.processData(this.option.dataSource);
        } else {
            this.option.dataSource.getData({ parentId: 0 }).then((value: any) => {
                this.data = this.processData(value.data);
            })
        }
    }

    ngAfterContentChecked() {
    }

    loadData(e: NzFormatEmitEvent): void {
        if (e.node.getChildren().length === 0 && e.node.isExpanded) {
            if (Array.isArray(this.option.dataSource)) {
                e.node.addChildren(this.processData(this.option.dataSource));
            } else {
                this.option.dataSource.getData({ parentId: e.node.key }).then((value: any) => {
                    e.node.addChildren(this.processData(value.data));
                })
            }
        }
    }

    processData(data: Array<any>): Array<any> {
        if (data && data.length) {
            for (let item of data) {
                item.title = item[this.option.dsLabel];
                item.key = item[this.option.dsValue];
                if (item.children) {
                    this.processData(item.children);
                }
            }
        }
        return data;
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
        this.option.onChange && this.option.onChange(this.option, this.treeSelect.selectedNodes);
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
