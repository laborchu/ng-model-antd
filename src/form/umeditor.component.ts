import {
    Component,
    AfterContentChecked,
    ViewContainerRef,
    ViewChild,
    ComponentFactoryResolver,
    Input
} from '@angular/core';
import {UMeditorComponent} from 'ngx-umeditor';
import {NgdsFormConfig, NgdsFormUmeditorCompOption} from './form.config';
import { NgdsFormComp } from './form.component';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngds-form-umeditor',
    template: `
        <div nz-col [nzSpan]="option.span">
            <div nz-form-item nz-row>
                <div nz-form-label nz-col [nzSpan]="option.labelSpan">
                    <label for="{{option.property}}">{{option.label}}</label>
                </div>
                <div nz-form-control nz-col [nzSpan]="option.compSpan" [nzValidateStatus]="getFormControl(option.property)">
                    <umeditor #editor [(ngModel)]="option.value"
                        [config]="setting"
                        [path]="option.path"
                        [loadingTip]="option.loadingTip?option.loadingTip:'加载中...'"
                        (onReady)="editorReady()"
                        (onDestroy)="editorDestroy()"
                        (onContentChange)="editorContentChange()"></umeditor>

                    <div nz-form-explain *ngFor="let val of option.validations">
                        <span class="error-msg" *ngIf="getFormControl(option.property).dirty&&
                        getFormControl(option.property).errors&&
                        getFormControl(option.property).errors[val.type]">{{val.msg}}</span>
                    </div>

                </div>
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

    ngOnInit() {
        if (!this.option.path) {
            this.option.path = "/node_modules/um-editor/";
        }
        if (this.option.config) {
            Object.assign(this.setting, this.option.config);
        }
    }

    editorReady() {
    }

    editorDestroy() {
    }

    editorContentChange() {
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
    }

    ngAfterContentChecked() {
    }

    getFormControl(name:string):any {
        return this.option.formGroup.controls[ name ];
      }
}
