import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
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
	NgdsFormRadio
} from './radio.component';
import {
	NgdsFormCheckbox
} from './checkbox.component';
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


export { NgdsForm } from './form';
export { NgdsFormComp } from './form.component';
export {
	NgdsFormConfig, NgdsFormOption, NgdsFormInputCompOption,NgdsFormInputListCompOption, NgdsFormTextareaCompOption, NgdsFormCompOption,
	NgdsFormRadioCompOption, NgdsFormCheckboxCompOption, NgdsFormSelectCompOption, NgdsFormDatePickerCompOption,
	NgdsFormUmeditorCompOption,NgdsFormUploaderCompOption
} from './form.config';
export {
	NgdsFormInput
} from './input.component';
export {
	NgdsFormInputList
} from './input-list.component';
export {
	NgdsFormRadio
} from './radio.component';
export {
	NgdsFormCheckbox
} from './checkbox.component';
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

const NGB_TABSET_DIRECTIVES = [NgdsForm, NgdsFormInput,NgdsFormInputList, NgdsFormRadio, NgdsFormCheckbox, NgdsFormSelect, 
	NgdsFormDatePicker,NgdsFormUmeditor,NgdsFormUploader,NgdsFormRow];

@NgModule({ 
	declarations: NGB_TABSET_DIRECTIVES, 
	exports: NGB_TABSET_DIRECTIVES, 
	imports: [CommonModule, FormsModule,ReactiveFormsModule, NgZorroAntdModule,
	UMeditorModule, CustomFormsModule,
        WebUploaderModule.forRoot(<WebUploaderConfig>{
            options: <Options>{
                swf: '/assets/webuploader-0.1.5/Uploader.swf',
                resize: false,
                duplicate: true,
                chunked:true,
                threads:1,
                chunkSize:4194304
            },
            path: '/assets/webuploader-0.1.5/',
            dependentLib: '/assets/webuploader-0.1.5/zepto.min.js'
        })],
	entryComponents: NGB_TABSET_DIRECTIVES
})
export class NgdsFormModule {
	static forRoot(): ModuleWithProviders { return { ngModule: NgdsFormModule, providers: [NgdsFormConfig] }; }
}
