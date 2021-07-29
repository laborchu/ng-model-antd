import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

import {
    NgdsFormConfig,
    NgdsFormOption, NgdsFormInput, NgdsFormInputList, NgdsFormInputRange, NgdsFormRadio, NgdsFormCheckbox, NgdsFormCheckboxGroup, NgdsFormSelect,
    NgdsFormDatePicker, NgdsFormDatePickerRange, NgdsFormCascader,
    NgdsFormUmeditor, NgdsFormUploader, NgdsFormCompOption,
    NgdsPanelOption, NgdsDataSource, NgdsModel, NgdsForm, NgdsFormComp, NgdsFormTreeSelect, NgdsFormTextarea, NgdsFormInputCompOption,NgdsFormRate
} from '../../../../../lib/index';
import { CustomValidators } from 'ng2-validation';


class Md5DataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsModel> {
        return new Promise<NgdsModel>((resolve, reject) => {
            resolve({ filePath: "http://www.dianshang.com/img/ztzx/1.jpg?imageView2/1/w/310/h/207", fileType: "mp4" });
        });
    }
}
class SexDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsModel> {
        return new Promise<NgdsModel>((resolve, reject) => {
            resolve([
                { label: "男", value: 1 },
                { label: "女", value: 2 }
            ]);
        });
    }
}
class LikeDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsModel> {
        return new Promise<NgdsModel>((resolve, reject) => {
            resolve({
                data: [
                    { label: "游泳", value: 1 },
                    { label: "下棋", value: 2 },
                    { label: "编程", value: 3 },
                    { label: "跑步", value: 4 }
                ]
            });
        });
    }
}
class SelectDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsModel> {
        return new Promise<NgdsModel>((resolve, reject) => {
            resolve({
                data: [
                    { label: "全部", value: "" },
                    { label: "杭州", value: 1 },
                    { label: "宁波", value: 2 },
                    { label: "温州", value: 3 },
                    { label: "上海", value: 4 }
                ]
            });
        });
    }
}
let areaDs = [
    {
        label: "浙江省", value: 1,
        children: [
            { label: "杭州市", value: 3, isLeaf: true },
            {
                label: "宁波市", value: 4,
                children: [
                    { label: "慈溪市", value: 5, isLeaf: true },
                    { label: "余姚市", value: 6, isLeaf: true },
                ]
            },
        ]
    },
    { label: "江苏省", value: 2, isLeaf: true },
]
class AddressDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsModel> {
        return new Promise<NgdsModel>((resolve, reject) => {
            if (params.index == -1) {
                resolve({
                    data: [
                        { label: "浙江省", value: 1 },
                        { label: "江苏省", value: 2 },
                    ]
                });
            } else if (params.index == 0) {
                resolve({
                    data: [
                        { label: "杭州市", value: 3 },
                        { label: "宁波市", value: 4 },
                    ]
                });
            } else if (params.index == 1) {
                resolve({
                    data: [
                        { label: "慈溪市", value: 5, isLeaf: true },
                        { label: "余姚市", value: 6, isLeaf: true },
                    ]
                });
            }
        });
    }
}
class CheckboxGroupDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsModel> {
        return new Promise<NgdsModel>((resolve, reject) => {
            resolve({
                data: [
                    {
                        title: "用户权限", children: [
                            { label: "权限管理", value: 1 },
                            { label: "角色管理", value: 2 },
                            { label: "用户管理", value: 3 },
                        ]
                    },
                    {
                        title: "订单管理", children: [
                            { label: "订单列表", value: 4 },
                            { label: "申请退款", value: 5 },
                        ]
                    },
                ]
            });
        });
    }
}
class TreeSelectDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsModel> {
        return new Promise<NgdsModel>((resolve, reject) => {
            resolve({
                data: [
                    { label: 'Child Node', value: `${(new Date()).getTime()}-0` },
                    { label: 'Child Node', value: `${(new Date()).getTime()}-1` }
                ]
            });
        });
    }
}

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    templateUrl: 'form.component.html',
    styleUrls: ['form.component.scss'],
})
export class FormComponent implements OnInit {

    constructor(private config: NgdsFormConfig) {
        this.config.uploaderConfig = {
            server: 'http://upload.qiniu.com/',
            md5Source: new Md5DataSource(),
            uploadBeforeSend: (block: any, data: any, headers: any) => {
                data.token = "";
            }
        };
    }
    @ViewChild('myForm') myForm: NgdsForm;
    @ViewChild('myForm2') myForm2: NgdsForm;

    option: NgdsFormOption = {
        components: [
            [
                {
                    label: '用户名', property: "username",tip:'密码注意保密', comp: NgdsFormInput, type: "text", attrId: "xxxx", maxLength: 20, validations: [
                        { msg: "用户名不能为空", type: "required", fn: Validators.required },
                        { msg: "长度在5-9", type: "rangeLength", fn: CustomValidators.rangeLength([5, 9]) },
                        { msg: "必须为数字", type: "digits", fn: CustomValidators.digits },
                    ],blur:(option:NgdsFormInputCompOption)=>{
                        alert(1)
                    }
                },
                { label: '密码', property: "user.password", comp: NgdsFormInput, type: "password" },
                { label: '邮件', property: "user.email", comp: NgdsFormInput, type: "email", disabled: true,value:'xxxxxxxx' }
            ],
            [
                {
                    label: '性别', property: "sex", comp: NgdsFormRadio, dataSource: new SexDataSource(), value: 1,
                    onChange: (option: NgdsFormCompOption) => {
                        if (option.value == 2) {
                            this.option.components[1][2].hidden = true;
                        } else {
                            this.option.components[1][2].hidden = false;
                        }
                        // this.myForm.refresh();
                    },
                    validations: [
                        { msg: "性别必选", type: "required", fn: Validators.required }
                    ]
                },
                {
                    label: '爱好',
                    property: "like",
                    comp: NgdsFormCheckbox,
                    showAllChecked: true,
                    dataSource: new LikeDataSource(),
                    value: [1],
                    onChange: (option: any) => {

                    },
                    validations: [
                        { msg: "爱好必选", type: "required", fn: Validators.required }

                    ]
                },
                {
                    label: '出生日期', property: "date", comp: NgdsFormDatePicker,
                    showTime: true, format: "yyyy-MM-dd HH:mm:ss",
                    validations: [
                        { msg: "出生日期必填", type: "required", fn: Validators.required },
                    ]
                },
            ],
            [
                {
                    label: '单选地区',
                    property: "location",
                    comp: NgdsFormSelect,
                    model:'tags',
                    dataSource: new SelectDataSource(),
                    onChange: (option: NgdsFormCompOption, value: any) => {
                    },
                    validations: [
                        { msg: "地区必选", type: "required", fn: Validators.required }
                    ]
                },
                {
                    label: '多选地区',
                    property: "location2",
                    comp: NgdsFormSelect,
                    dataSource: new SelectDataSource(),
                    model: "multiple",
                    onChange: (option: NgdsFormCompOption, value: any) => {
                        let data = this.myForm.getValue();
                    },
                    validations: [
                        { msg: "地区必选", type: "required", fn: Validators.required }
                    ]
                },
                {
                    label: '价格区间',
                    property: "startPrice",
                    property2: "endPrice",
                    comp: NgdsFormInputRange,
                    splitLabel:'日',
                    afterLabel:'月'
                }

            ],
            [
                {
                    label: '时间区间',
                    property: "rangeDate",
                    comp: NgdsFormDatePickerRange
                },
                {
                    label: '地区级联',
                    property: "address",
                    changeOnSelect:true,
                    dataSource: areaDs,
                    comp: NgdsFormCascader,
                    validations: [
                        { msg: "地区级联", type: "required", fn: Validators.required }
                    ],
                    onChange:(option: NgdsFormCompOption)=>{
                        debugger
                    }

                },
                {
                    label: '授权',
                    property: "auth",
                    dataSource: new CheckboxGroupDataSource(),
                    comp: NgdsFormCheckboxGroup,
                    value: [1, 2, 4]

                }
            ],
            [
                {
                    label: '分类',
                    property: "cat",
                    dsLabel: 'label',
                    dsValue: 'value',
                    dataSource: new TreeSelectDataSource(),
                    comp: NgdsFormTreeSelect,
                    checkable: true,
                    asyncData: true,
                },

                {
                    label: '评分',
                    property: "rate",
                    comp: NgdsFormRate,

                }
            ]
        ]

    }

    option2: NgdsFormOption = {
        components: [

            [
                { label: '属性值', property: "valueArray", valueField: "name", comp: NgdsFormInputList },
            ],
            [
                {
                    label: '上传头像',
                    property: "touxiang",
                    accept: "image",
                    multiple: false,
                    limit: 3,
                    uploaderId: new Date().getTime() + "",
                    comp: NgdsFormUploader,
                    width: 200,
                    whTip:'400*300',
                    fileSingleSizeLimit:1024*6,
                    itemSelect:true
                },
            ],
            [
                {
                    label: '爱好描述', property: "likeDesc", comp: NgdsFormTextarea
                }
            ],
            [
                {
                    label: '介绍', property: "desc", comp: NgdsFormUmeditor,
                    config: {
                        imagePath: "http://www.baidu.com",
                        toolbar: ['image']
                    },
                    validations: [
                        { msg: "介绍必填", type: "required", fn: Validators.required },
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
        buttons: [
            {
                text: '保存',
                action: (item) => {
                    let data = this.myForm.getValue();
                    let changeValue = this.myForm.getChangeValue();
                    console.log(changeValue);

                    if (this.myForm.checkVal()) {

                    }
                    if (this.myForm2.checkVal()) {
                        let data = this.myForm2.getValue();
                    }
                }
            }
        ]

    }

    /**
     * Get the names OnInit
     */
    ngOnInit() {
        setTimeout(() => {
            // this.option = {
            //     components: [
            //         [
            //             {label: '属性值', property: "valueArray",valueField:"name", comp: NgdsFormInputList},
            //         ],
            //         [
            //             {
            //                 label: '上传头像',
            //                 property: "touxiang",
            //                 accept:"image",
            //                 multiple:false,
            //                 limit:1,
            //                 uploaderId: new Date().getTime() + "",
            //                 comp: NgdsFormUploader
            //             },
            //         ]
            //     ]

            // }

            // this.myForm.setValue({ "username": "4345345", 
            // "user": { "password": "44444" }, 
            // "sex": 1, 
            // "like": [1], 
            // "date": "2018-07-06T15:22:43.006Z", 
            // "location": 1, 
            // "location2": [1], 
            // "startPrice": 44, 
            // "endPrice": 44, 
            // "rangeDate": ["2018-07-05T16:00:00.000Z", "2018-08-05T16:00:00.000Z"], 
            // "address": [{ label: "江苏省", value: 2 }], 
            // "auth": [1, 2, 4] ,
            // "rate":4
            // })

            // this.myForm2.setValue({
            //     desc:"sfsdfsdf",
            // })

        }, 5000)

    }


}
