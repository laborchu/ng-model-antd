import {
    Component,
    OnInit,
    ViewContainerRef,
    ViewChild,
    ComponentFactoryResolver,
    Input,
    Inject,
    NgZone
} from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { UMeditorComponent } from 'ngx-umeditor';
import { NgdsFormConfig, NgdsFormUploaderCompOption } from './form.config';
import { WebUploaderComponent, File, FileStatus, Options } from 'ngx-webuploader';
import { NgdsFormComp } from './form.component';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngds-form-uploader',
    template: `
    <div nz-col [nzSpan]="option.span" *ngIf="show" [hidden]="option.hidden">
        <nz-form-item nz-row>
            <nz-form-label nz-col [nzSpan]="option.labelSpan">
            {{option.label}}
            </nz-form-label>
            <nz-form-control class="uploader" nz-col [nzSpan]="option.compSpan" [nzValidateStatus]="getFormControl(option.property)">
                <div class="upload-item" *ngFor="let item of option.value;let itemIndex=index" (click)="tapItem(item,option.value,itemIndex)" [style.width]="option.width+'px'" [style.height]="option.height+'px'">
                    <img *ngIf="isImg(item)" src="{{item.filePath}}"/>
                    <div class="upload-item-video" *ngIf="isVideo(item)">
                        <i class="iconfont icon-play"></i>
                    </div>   
                    <div class="upload-item-other" *ngIf="!isVideo(item)&&!isImg(item)">
                        <i class="iconfont icon-file-blank">
                        </i>
                        <span class="file-type">{{item.fileType}}</span>
                    </div>
                    <svg class="icon" aria-hidden="true" (click)="tapDelItem(item)">
                    <use xlink:href="#icon-shanchu"></use>
                    </svg>
                </div>
                <a id="{{getUploaderId()}}" [style.visibility]="option.limit>0&&option.limit<=option.value.length?'hidden':'unset'">
                    +
                    <span class="wh-tip" *ngIf="option.whTip">{{option.whTip}}</span>
                </a>
                <webuploader *ngIf="ngxOptions" [options]="ngxOptions" 
                (onReady)="onReady($event)">
               </webuploader>

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
export class NgdsFormUploader extends NgdsFormComp implements OnInit {
    constructor(@Inject(NgdsFormConfig) private formConfig: NgdsFormConfig) {
        super();
    }

    option: NgdsFormUploaderCompOption;
    ngxOptions: Options;
    show: boolean = false;

    ngOnInit() {
        if (this.option.multiple == undefined) {
            this.option.multiple = true;
        }
        if (!this.option.value) {
            this.option.value = [];
        }
        if (this.option.limit == undefined) {
            this.option.limit = 5;
        }
        this.show = true;
        setTimeout(() => {
            this.ngxOptions = {
                pick: {
                    id: "#" + this.getUploaderId(),
                    multiple: this.option.multiple
                },
                accept: this.getAccept(),
                compress: this.option.compress,
                fileSingleSizeLimit: this.option.fileSingleSizeLimit,
            }
        }, 200);

    }

    getUploaderId(): string {
        return this.option.uploaderId ? this.option.uploaderId : "picker";
    }

    getAccept(): any {
        if (this.option.accept == "image") {
            return {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        } else if (this.option.accept == "video") {
            return {
                title: 'Images',
                extensions: 'mp4',
                mimeTypes: 'video/*'
            }
        }
        return null;
    }
    onReady(uploader: WebUploaderComponent) {
        uploader.ngOnDestroy = function () {
            if (this.instance) {
                try {
                    this.instance.destroy();
                    this.instance = null;
                } catch (e) {
                }
            }
            this.onDestroy.emit();
        }
        uploader.Instance.options.server = this.formConfig.uploaderConfig.server;
        uploader.Instance
            .on('fileQueued', (file: any) => {
                if (this.formConfig.uploaderConfig && this.formConfig.uploaderConfig.md5Source) {
                    uploader.Instance.md5File(file).then((val: string) => {
                        file["md5"] = val;
                        this.formConfig.uploaderConfig.md5Source.getData({ md5: val }).then((data: any) => {
                            if (data.filePath) {
                                this.wrapperData(data, file);
                                this.option.value.push(data);
                                this.setValue(undefined)
                                this.onChange()
                            } else {
                                uploader.Instance.upload(file);
                            }
                        }, (err: any) => {
                            console.log(err);
                            this.option.errHandler && this.option.errHandler(err);
                        })
                    });
                } else {
                    uploader.Instance.upload(file);
                }
            })
            .on('uploadBeforeSend', (block: any, data: any, headers: any) => {
                this.formConfig.uploaderConfig && this.formConfig.uploaderConfig.uploadBeforeSend && this.formConfig.uploaderConfig.uploadBeforeSend(block, data, headers);
            })
            .on('uploadSuccess', (file: File, data: any) => {
                this.wrapperData(data, file);
                this.formConfig.uploaderConfig && this.formConfig.uploaderConfig.uploadSuccess && this.formConfig.uploaderConfig.uploadSuccess(data);
                this.option.value.push(data);
                this.setValue(undefined)
                this.onChange()
            })
            .on('uploadError', (file: File, err: any) => {
                console.log(err);
                this.option.errHandler && this.option.errHandler(err);
            })
            .on('error', (type: string) => {
                if (type == "F_EXCEED_SIZE") {
                    alert(`文件大小不能超过${this.bytesToSize(this.option.fileSingleSizeLimit)}`);
                }
            });
    }

    bytesToSize(bytes: any) {
        if (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
        else if (bytes >= 1048576) { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
        else if (bytes >= 1024) { bytes = (bytes / 1024).toFixed(2) + " KB"; }
        else if (bytes > 1) { bytes = bytes + " bytes"; }
        else if (bytes == 1) { bytes = bytes + " byte"; }
        else { bytes = "0 bytes"; }
        return bytes;
    }

    wrapperData(data: any, file: any) {
        data.fileName = file.name;
        if (file.ext) {
            data.fileType = file.ext.toLowerCase();
        } else {
            data.fileType = "";
        }
        data.fileSize = file.size;
        data.md5 = file["md5"];
        this.formConfig.uploaderConfig && this.formConfig.uploaderConfig.wrapperUploadData && this.formConfig.uploaderConfig.wrapperUploadData(data);
    }

    isImg(data: any): boolean {
        let index: number = ["bmp", "jpg", "jpeg", "png", "gif"].indexOf(data.fileType);
        if (index != -1) {
            return true;
        } else {
            return false;
        }
    }

    isVideo(data: any): boolean {
        let index: number = ["mp4"].indexOf(data.fileType);
        if (index != -1) {
            return true;
        } else {
            return false;
        }
    }

    tapItem(item: any, itemList: Array<any>, index: number): void {
        if (this.isImg(item)) {
            this.formConfig.uploaderConfig.tapImage && this.formConfig.uploaderConfig.tapImage(item, itemList, index);
        } else if (this.isVideo(item)) {
            this.formConfig.uploaderConfig.tapVideo && this.formConfig.uploaderConfig.tapVideo(item);
        }
    }

    tapDelItem(item: any): void {
        var index = this.option.value.indexOf(item);
        if (index > -1) {
            this.option.value.splice(index, 1);
        }
        this.setValue(undefined)
        this.onChange()
    }

    setValue(value: any) {
        if (value !== undefined) {
            this.option.value = value || [];
        }
    }

    onChange() {
        if (this.option.validations) {
            let formControl = this.option.formGroup.controls[this.option.property];
            formControl.setErrors(null);

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
