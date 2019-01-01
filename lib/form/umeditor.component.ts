import {
    Component,
    AfterContentChecked,
    ViewContainerRef,
    ViewChild,
    ComponentFactoryResolver,
    Input
} from '@angular/core';
import { UMeditorComponent } from 'ngx-umeditor';
import { NgdsFormConfig, NgdsFormUmeditorCompOption } from './form.config';
import { NgdsFormComp } from './form.component';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngds-form-umeditor',
    template: `
        <div nz-col [nzSpan]="option.span" *ngIf="!option.hidden">
            <div nz-form-item nz-row>
                <div nz-form-label nz-col [nzSpan]="option.labelSpan">
                    <label for="{{option.property}}">{{option.label}}</label>
                </div>
                <nz-form-control nz-col [nzSpan]="option.compSpan" [nzValidateStatus]="getFormControl(option.property)">
                    <umeditor #editor [(ngModel)]="option.value" *ngIf="showEditor"
                        [config]="setting"
                        [path]="option.path"
                        [loadingTip]="option.loadingTip?option.loadingTip:'加载中...'"
                        (onReady)="editorReady()"
                        (onDestroy)="editorDestroy()"
                        (onContentChange)="onChange()"></umeditor>

                    <div nz-form-explain *ngFor="let val of option.validations">
                        <span class="error-msg" *ngIf="getFormControl(option.property).errors&&
                        getFormControl(option.property).errors[val.type]">{{val.msg}}</span>
                    </div>

                </nz-form-control>
            </div>
        </div>
    `
})
export class NgdsFormUmeditor extends NgdsFormComp implements AfterContentChecked {
    constructor() {
        super();
    }

    @ViewChild('editor') editor: UMeditorComponent;

    setting = {
        //默认的编辑区域宽度
        initialFrameWidth: '100%',
        //默认的编辑区域高度
        initialFrameHeight: 300,
        imageUrl: '/umeditor/img'
    };

    option: NgdsFormUmeditorCompOption;
    showEditor: boolean = false;

    ngOnInit() {
        if (!this.option.path) {
            this.option.path = "/node_modules/um-editor/";
        }
        if (this.option.config) {
            Object.assign(this.setting, this.option.config);
        }
        setTimeout(() => {
            this.showEditor = true;
        }, 100)
    }

    editorReady() {
    }

    editorDestroy() {
    }

    setValue(value: any) {
        if (value !== undefined) {
            this.option.value = value;
        }
    }

    onChange() {
        if (this.option.validations) {
            for (let val of this.option.validations) {
                if (val.type == "required") {
                    let formControl = this.option.formGroup.controls[this.option.property];
                    if (!this.option.value) {
                        formControl.setErrors({ "required": true })
                    } else {
                        if (formControl.errors) {
                            delete formControl.errors["required"];
                        }
                    }
                    if (formControl.errors && Object.keys(formControl.errors).length == 0) {
                        formControl.setErrors(null);
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
