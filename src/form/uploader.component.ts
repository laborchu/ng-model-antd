import {
    Component,
    OnInit,
    ViewContainerRef,
    ViewChild,
    ComponentFactoryResolver,
    Input
} from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import {UMeditorComponent} from 'ngx-umeditor';
import {NgdsFormConfig, NgdsFormUploaderCompOption} from './form.config';
import { WebUploaderComponent, File, FileStatus, Options } from 'ngx-webuploader';
import { NgdsFormComp } from './form.component';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngds-form-uploader',
    template: `
    <div nz-col [nzSpan]="option.span" *ngIf="!option.hidden">
        <div nz-form-item nz-row>
            <div nz-form-label nz-col [nzSpan]="option.labelSpan">
                <label for="{{option.property}}">{{option.label}}</label>
            </div>
            <div nz-form-control class="uploader" nz-col [nzSpan]="option.compSpan" [nzValidateStatus]="getFormControl(option.property)">
                <div class="upload-item" *ngFor="let item of option.value" (click)="tapItem(item)" [style.width]="option.width+'px'" [style.height]="option.height+'px'">
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
                <a id="{{getUploaderId()}}" [hidden]="option.limit>0&&option.limit<=option.value.length">+</a>
                <webuploader *ngIf="ngxOptions" [options]="ngxOptions" 
                (onReady)="onReady($event)">
               </webuploader>
                <div nz-form-explain *ngFor="let val of option.validations">
                    <span class="error-msg" *ngIf="getFormControl(option.property).errors&&
                    getFormControl(option.property).errors[val.type]">{{val.msg}}</span>
                </div>

            </div>
        </div>
    </div>
    `
})
export class NgdsFormUploader extends NgdsFormComp implements OnInit {
    constructor(private formConfig:NgdsFormConfig) {
        super();
    }

    option: NgdsFormUploaderCompOption;
    ngxOptions: Options;

    ngOnInit() {
        if(this.option.multiple==undefined){
            this.option.multiple = true;
        }
        if(!this.option.value){
            this.option.value = [];
        }
        if(this.option.limit==undefined){
            this.option.limit = 5;
        }

        setTimeout(()=>{
            this.ngxOptions = {
                pick: { 
                    id: "#" + this.getUploaderId(),
                    multiple: this.option.multiple
                },
                accept:this.getAccept()
            }
        },200);
        
    }

    getUploaderId():string{
        return this.option.uploaderId?this.option.uploaderId:"picker";
    }

    getAccept():any{
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
        uploader.Instance.options.server = this.formConfig.uploaderConfig.server;
        uploader.Instance
            .on('fileQueued', (file: any) => {
                if (this.formConfig.uploaderConfig && this.formConfig.uploaderConfig.md5Source) {
                    uploader.Instance.md5File(file).then((val:string) => {
                        file["md5"] = val;
                        this.formConfig.uploaderConfig.md5Source.getData({ md5: val }).then((data: any) => {
                            if (data.filePath) {
                                this.wrapperData(data, file);
                                this.option.value.push(data);
                            } else {
                                uploader.Instance.upload(file);
                            }
                        }, (err: any) => {
                            console.log(err);
                            this.option.errHandler && this.option.errHandler(err);
                        })
                    });
                }else{
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
            })
            .on('uploadError', (file: File, err: any) => {
                console.log(err);
                this.option.errHandler && this.option.errHandler(err);
            });
    }

    wrapperData(data: any, file: any){
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

    isImg(data:any):boolean{
        let index:number = ["bmp", "jpg", "jpeg", "png", "gif"].indexOf(data.fileType);
        if(index!=-1){
            return true;
        }else{
            return false;
        }
    }

    isVideo(data:any):boolean{
        let index: number = ["mp4"].indexOf(data.fileType);
        if(index!=-1){
            return true;
        }else{
            return false;
        }
    }

    tapItem(item:any):void{
    }

    tapDelItem(item: any): void {
        var index = this.option.value.indexOf(item);
        if (index > -1) {
           this.option.value.splice(index, 1);
        }
    }

    onChange(value:any){
        if (value !== undefined) {
            this.option.value = value || [];
        }
    }

    ngAfterContentChecked() {
    }
    
    getFormControl(name:string):any {
        return this.option.formGroup.controls[ name ];
      }
    
}
