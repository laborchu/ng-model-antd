import { Injectable } from '@angular/core';
import { ValidatorFn, FormGroup } from '@angular/forms';
import { NgdsDataSource, NgdsModel } from '../core/datasource';
import { NgdsForm } from './form';


export type wrapperUploadDataFunc = (data: any) => void;
export type uploadSuccessFunc = (data: any) => void;
export type uploadBeforeSendFunc = (block: any, data: any, headers: any) => void;
export type tapImageFunc = (item: any, itemList: Array<any>, index: number) => void;
export type tapVideoFunc = (item: any) => void;

/**
 * Configuration service for the NgbTabset component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tabsets used in the application.
 */
@Injectable()
export class NgdsFormConfig {
	uploaderConfig: NgdsFormUploaderConfig;

}

export class NgdsFormUploaderConfig {
	server: string;//服务器地址
	md5Source?: NgdsDataSource;
	wrapperUploadData?: wrapperUploadDataFunc;
	uploadBeforeSend?: uploadBeforeSendFunc;//错误处理
	uploadSuccess?: uploadSuccessFunc;//上传完成
	tapImage?: tapImageFunc;//点击图片
	tapVideo?: tapVideoFunc;//点击视频
}

export class NgdsFormOption {
	id?: string;
	labelSpan?: number;
	compSpan?: number;
	gutter?: number;
	components: Array<Array<NgdsFormCascaderCompOption | NgdsFormCompOption | NgdsFormInputCompOption | NgdsFormInputListCompOption | NgdsFormSelectCompOption | NgdsFormTextareaCompOption | NgdsFormInputRangeCompOption | NgdsFormRadioCompOption | NgdsFormUploaderCompOption | NgdsFormUmeditorCompOption | NgdsFormCheckboxGroupCompOption | NgdsFormDatePickerCompOption | NgdsFormCheckboxCompOption | NgdsFormTreeSelectCompOption>>;
	value?: any;
	showSearch?: boolean;
	search?: NgdsFormSearchOption;
	column?: number;//最大列数量
	remember?: boolean;
}


export type onChangeFunc = (option: NgdsFormCompOption, valueObj?: any) => void;
export type onBlurFunc = (option: NgdsFormCompOption) => void;

export class NgdsFormCompOption {
	comp: any;
	label: string;
	property: string;
	property2?: string;
	tip?: string;
	value?: any;
	span?: number;//组件span
	labelSpan?: number;//组件标签span
	compSpan?: number;//组件输入组件span
	validations?: Array<NgdsFormValidationOption>;
	formGroup?: FormGroup;
	onChange?: onChangeFunc;
	hidden?: boolean;
	formComp?: NgdsForm;
	disabled?: boolean;
	formOption?: NgdsFormOption;
	attrId?: string;
}

export class NgdsFormValidationOption {
	property?: string;
	msg: string;
	type: string;
	fn: ValidatorFn;
}
export class NgdsFormSearchOption extends NgdsFormCompOption {
	offset?: number;
	hideReset?: boolean;
}

export class NgdsFormInputCompOption extends NgdsFormCompOption {
	type: 'text' | 'password';
	placeHolder?: string;
	maxLength?: number;
	blur?: onBlurFunc;
}

export class NgdsFormInputRangeCompOption extends NgdsFormCompOption {
}

export class NgdsFormInputListCompOption extends NgdsFormInputCompOption {
	valueField: string;
}

export class NgdsFormTextareaCompOption extends NgdsFormCompOption {
	placeHolder?: string;
	maxLength: number;
}


export interface NgdsLvDataSource extends NgdsDataSource {
	label?: string;
	value?: string;
}

export class NgdsFormRadioCompOption extends NgdsFormCompOption {
	dataSource: NgdsDataSource;
	dsLabel?: string;
	dsValue?: string;
}

export class NgdsFormCascaderCompOption extends NgdsFormCompOption {
	dataSource: NgdsDataSource;
	dsLabel?: string;
	dsValue?: string;
	placeHolder?: string;
	changeOnSelect?:boolean;
}

export class NgdsFormCheckboxCompOption extends NgdsFormCompOption {
	dataSource: NgdsDataSource;
	data: Array<any>;
	showAllChecked?: boolean;
	dsLabel?: string;
	dsValue?: string;
}

export class NgdsFormCheckboxGroupCompOption extends NgdsFormCompOption {
	dataSource: NgdsDataSource | Array<any>;
	dsTitle?: string
	dsLabel?: string;
	dsValue?: string;
}

export class NgdsFormSelectCompOption extends NgdsFormCompOption {
	dataSource: NgdsDataSource;
	dsLabel?: string;
	dsValue?: string;
	model?: string;
	placeHolder?: string;
	searchRemote?: boolean;
}

export class NgdsFormDatePickerCompOption extends NgdsFormCompOption {
	showTime?: boolean;
	format?: string;
}

export class NgdsFormTreeSelectCompOption extends NgdsFormCompOption {
	dataSource: NgdsDataSource;
	dsLabel?: string;
	dsValue?: string;
	asyncData: boolean;
	checkable: boolean;
}

export class NgdsFormUmeditorCompOption extends NgdsFormCompOption {
	config?: any; //umeditor配置项
	path?: string;//umeditor代码根目录路径，以 / 结尾
	loadingTip?: string;//初始化提示文本
	setting?: any;
}


export class NgdsFormRateCompOption extends NgdsFormCompOption {
}

export type errHandlerFunc = (err: any) => void;

export class NgdsFormUploaderCompOption extends NgdsFormCompOption {
	accept?: 'image' | 'video';
	multiple?: boolean;
	limit?: number;
	uploaderId?: string;//默认picker
	errHandler?: errHandlerFunc;//错误处理
	width?: number;
	height?: number;
	whTip?: string;
	compress?: any;
	fileSingleSizeLimit?: number;
	itemSelect:boolean = false;
}



