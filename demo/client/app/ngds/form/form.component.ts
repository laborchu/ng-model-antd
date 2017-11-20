import {Component, OnInit,ViewChild} from '@angular/core';
import {Validators, FormControl} from '@angular/forms';

import {
    NgdsFormConfig,
    NgdsFormOption, NgdsFormInput, NgdsFormRadio, NgdsFormCheckbox, NgdsFormSelect,NgdsFormDatePicker,
     NgdsFormUmeditor, NgdsFormUploader, NgdsFormCompOption,
    NgdsPanelOption, NgdsDataSource, NgdsModel, NgdsForm, NgdsFormComp
} from '../../../../../src/index';
import {CustomValidators} from 'ng2-validation';


class Md5DataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsModel> {
        return new Promise<NgdsModel>((resolve, reject) => {
            resolve({ filePath: "http://www.dianshang.com/img/ztzx/1.jpg?imageView2/1/w/310/h/207", fileType:"mp4" });
        });
    }
}
class SexDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsModel> {
        return new Promise<NgdsModel>((resolve, reject) => {
            resolve([
                {label: "男", value: 1},
                {label: "女", value: 2}
            ]);
        });
    }
}
class LikeDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsModel> {
        return new Promise<NgdsModel>((resolve, reject) => {
            resolve([
                {label: "游泳", value: 1},
                {label: "下棋", value: 2},
                {label: "编程", value: 3},
                {label: "跑步", value: 4}
            ]);
        });
    }
}
class SelectDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsModel> {
        return new Promise<NgdsModel>((resolve, reject) => {
            resolve([
                {label: "全部", value: ""},
                {label: "杭州", value: 1},
                {label: "宁波", value: 2},
                {label: "温州", value: 3},
                {label: "上海", value: 4}
            ]);
        });
    }
}

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    templateUrl: 'form.component.html',
    styleUrls: ['form.component.css'],
})
export class FormComponent implements OnInit {

    constructor(private config:NgdsFormConfig) {
        this.config.uploaderConfig = {
            server: 'http://upload.qiniu.com/',
            md5Source: new Md5DataSource(),
            uploadBeforeSend : (block: any, data: any, headers: any) => {
                data.token = "";
                debugger
            }
        };
    }
    @ViewChild('myForm') myForm:NgdsForm;
    @ViewChild('myForm2') myForm2:NgdsForm;

    option: NgdsFormOption = {
        components: [
            [
                {
                    label: '用户名', property: "username", comp: NgdsFormInput, type: "text", validations: [
                    {msg: "用户名不能为空", type: "required", fn: Validators.required},
                    {msg: "长度在5-9", type: "rangeLength", fn: CustomValidators.rangeLength([5, 9])},
                    {msg: "必须为数字", type: "digits", fn: CustomValidators.digits},
                ]
                },
                {label: '密码', property: "password", comp: NgdsFormInput, type: "password"},
                {label: '邮件', property: "email", comp: NgdsFormInput, type: "email"}
            ],
            [
                {
                    label: '性别', property: "sex", comp: NgdsFormRadio, dataSource: new SexDataSource(), value:1,
                    onChange: (option: NgdsFormCompOption) => {
                    },
                    validations: [
                        {msg: "性别必选", type: "required", fn: Validators.required}
                    ]
                },
                {
                    label: '爱好',
                    property: "like",
                    comp: NgdsFormCheckbox,
                    dataSource: new LikeDataSource(),
                    value: [1],
                    onChange: (option: any) => {
                    },
                    validations: [
                        {msg: "爱好必选", type: "required", fn: Validators.required}
    
                    ]
                },
                {
                    label: '出生日期', property: "date", comp: NgdsFormDatePicker, validations: [
                    {msg: "出生日期必填", type: "required", fn: Validators.required},
                ]
                },
            ],
            [
                {
                    label: '单选地区',
                    property: "location",
                    comp: NgdsFormSelect,
                    dataSource: new SelectDataSource(),
                    validations: [
                        {msg: "地区必选", type: "required", fn: Validators.required}
                    ]
                },
                {
                    label: '多选地区',
                    property: "location2",
                    comp: NgdsFormSelect,
                    dataSource: new SelectDataSource(),
                    model:"multiple",
                    validations: [
                        {msg: "地区必选", type: "required", fn: Validators.required}
                    ]
                },
            ]
        ]

    }

    option2: NgdsFormOption = {
        components: [
            [
                {
                    label: '上传头像',
                    property: "touxiang",
                    accept:"image",
                    multiple:false,
                    limit:1,
                    uploaderId: new Date().getTime() + "",
                    comp: NgdsFormUploader
                },
            ],
            [
                {
                    label: '爱好描述', property: "likeDesc", comp: NgdsFormInput, type: "textarea"
                }
            ],
            [
                {
                    label: '介绍', property: "desc", comp: NgdsFormUmeditor, 
                    config: {
                        imagePath: "http://www.baidu.com"
                    },
                    validations: [
                    {msg: "介绍必填", type: "required", fn: Validators.required},
                    ]
                }
            ]
        ]

    }

    panelOption: NgdsPanelOption = {
        crumbs: [
            {
                text: "专题资讯"
            },
            {
                text: "新增资讯"
            }
        ],
        buttons:[
            {
                text: '保存',
                action: (item) => {
                    if(this.myForm.checkVal()){
                        alert(item);
                    }
                }
            }
        ]

    }

    /**
     * Get the names OnInit
     */
    ngOnInit() {
    }


}
