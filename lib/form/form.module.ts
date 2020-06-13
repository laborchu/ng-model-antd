import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UMeditorModule } from 'ngx-umeditor';
import { CustomFormsModule } from 'ng2-validation'
import { WebUploaderModule, WebUploaderConfig, Options, OptionsPick, OptionsThumb } from 'ngx-webuploader';
import { NgdsFormComp } from './form.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { NgdsForm } from './form';
import {
	NgdsFormConfig, NgdsFormOption
} from './form.config';
import {
	NgdsFormInput
} from './input.component';
import {
	NgdsFormInputList
} from './input-list.component';
import {
	NgdsFormInputRange
} from './input-range.component';
import {
	NgdsFormRadio
} from './radio.component';
import {
	NgdsFormCheckbox
} from './checkbox.component';
import {
	NgdsFormCheckboxGroup
} from './checkbox-group.component';
import {
	NgdsFormSelect
} from './select.component';
import {
	NgdsFormUmeditor
} from './umeditor.component';
import {
	NgdsFormUploader
} from './uploader.component';
import {
	NgdsFormRow
} from './row.component';
import {
	NgdsFormDatePicker
} from './datepicker.component';
import {
	NgdsFormDatePickerRange
} from './datepicker-range.component';
import {
	NgdsFormSearchBar
} from './search-bar.component';
import {
	NgdsFormCascader
} from './cascader.component';
import {
	NgdsFormTreeSelect
} from './tree-select.component';
import {
	NgdsFormTextarea
} from './textarea.component';
import {
	NgdsFormRate
} from './rate.component';


export { NgdsForm } from './form';
export { NgdsFormComp } from './form.component';
export {
	NgdsFormConfig, NgdsFormOption, NgdsFormInputCompOption, NgdsFormInputListCompOption, NgdsFormInputRangeCompOption, NgdsFormTextareaCompOption, NgdsFormCompOption,
	NgdsFormRadioCompOption, NgdsFormCheckboxCompOption, NgdsFormSelectCompOption, NgdsFormDatePickerCompOption,
	NgdsFormUmeditorCompOption, NgdsFormUploaderCompOption, NgdsFormCascaderCompOption, NgdsFormCheckboxGroupCompOption, NgdsFormTreeSelectCompOption, NgdsFormRateCompOption
} from './form.config';
export {
	NgdsFormInput
} from './input.component';
export {
	NgdsFormInputList
} from './input-list.component';
export {
	NgdsFormInputRange
} from './input-range.component';
export {
	NgdsFormRadio
} from './radio.component';
export {
	NgdsFormCheckbox
} from './checkbox.component';
export {
	NgdsFormCheckboxGroup
} from './checkbox-group.component';
export {
	NgdsFormSelect
} from './select.component';
export {
	NgdsFormUmeditor
} from './umeditor.component';
export {
	NgdsFormUploader
} from './uploader.component';
export {
	NgdsFormDatePicker
} from './datepicker.component';
export {
	NgdsFormDatePickerRange
} from './datepicker-range.component';
export {
	NgdsFormCascader
} from './cascader.component';
export {
	NgdsFormTreeSelect
} from './tree-select.component';
export {
	NgdsFormTextarea
} from './textarea.component';
export {
	NgdsFormRate
} from './rate.component';

const NGB_TABSET_DIRECTIVES = [NgdsForm, NgdsFormInput, NgdsFormInputList, NgdsFormInputRange, NgdsFormRadio, NgdsFormCheckbox, NgdsFormCheckboxGroup, NgdsFormSelect,
	NgdsFormDatePicker, NgdsFormDatePickerRange, NgdsFormCascader, NgdsFormUmeditor, NgdsFormUploader, NgdsFormRow, NgdsFormSearchBar, NgdsFormTreeSelect, NgdsFormTextarea,
	NgdsFormRate];

@NgModule({
	declarations: NGB_TABSET_DIRECTIVES,
	exports: NGB_TABSET_DIRECTIVES,
	imports: [CommonModule, FormsModule, ReactiveFormsModule, NgZorroAntdModule,
		UMeditorModule.forRoot(), CustomFormsModule,
		WebUploaderModule.forRoot(<WebUploaderConfig>{
			options: <Options>{
				swf: '/assets/webuploader-0.1.5/Uploader.swf',
				resize: false,
				duplicate: true,
				chunked: true,
				threads: 1,
				chunkSize: 4194304
			},
			path: '/assets/webuploader-0.1.5/',
			dependentLib: '/assets/webuploader-0.1.5/zepto.min.js'
		})],
	entryComponents: NGB_TABSET_DIRECTIVES
})
export class NgdsFormModule {
	static forRoot(): ModuleWithProviders { return { ngModule: NgdsFormModule, providers: [NgdsFormConfig] }; }
}
