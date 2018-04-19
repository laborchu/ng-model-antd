import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgdsDataGridModule } from './datagrid/datagrid.module';
export {
	NgdsDataGridModule,
	NgdsDataGrid,
	NgdsDataGridConfig, NgdsDataGridOption, NgdsDataGridTableOption,
	NgdsDataGridColumnOption, NgdsDataGridOpOption, NgdsDataGridOpBtnOption,
	NgdsDataGridModel, NgdsDataGridPageModel
} from './datagrid/datagrid.module';

import { NgdsPanelModule } from './panel/panel.module';
export {
	NgdsPanelModule,
	NgdsPanel,

	NgdsPanelConfig, NgdsPanelOption, NgdsPanelCrumbsOption
} from './panel/panel.module';


import { NgdsTabModule } from './tab/tab.module';
export {
	NgdsTabModule,
	NgdsTab,
	NgdsTabConfig, NgdsTabOption
} from './tab/tab.module';

import { NgdsBlockModule } from './block/block.module';
export {
	NgdsBlockModule,
	NgdsBlock, NgdsBlockInfo,
	NgdsBlockConfig, NgdsBlockOption,
	NgdsBlockInfoOption, NgdsBlockInfoItemOption
} from './block/block.module';

import { NgdsFormModule } from './form/form.module';
export {
	NgdsFormModule,
	NgdsForm,
	NgdsFormComp,
	NgdsFormInput,
	NgdsFormInputList,
	NgdsFormInputRange,
	NgdsFormRadio,
	NgdsFormCheckbox,
	NgdsFormCheckboxGroup,
	NgdsFormSelect,
	NgdsFormUmeditor,
	NgdsFormUploader,
	NgdsFormDatePicker,
	NgdsFormDatePickerRange,
	NgdsFormCascader,

	NgdsFormConfig, NgdsFormOption, NgdsFormInputCompOption, NgdsFormInputListCompOption, NgdsFormTextareaCompOption, NgdsFormCompOption,
	NgdsFormRadioCompOption, NgdsFormCheckboxCompOption, NgdsFormCheckboxGroupCompOption, NgdsFormSelectCompOption,
	NgdsFormDatePickerCompOption, NgdsFormUmeditorCompOption, NgdsFormUploaderCompOption, NgdsFormCascaderCompOption
} from './form/form.module';


export {
	NgdsDataSource, NgdsModel
} from './core/datasource';


import {
	NgdsPipeModule
} from './pipe/index';

export {
	NgdsPipeModule, DatagridDeepPropertyPipe, DatagridDatePropertyPipe
} from './pipe/index';


const NGB_MODULES = [
	NgdsDataGridModule,
	NgdsPanelModule,
	NgdsFormModule,
	NgdsTabModule,
	NgdsBlockModule
];

@NgModule({
	imports: [
		NgdsDataGridModule.forRoot(),
		NgdsPanelModule.forRoot(),
		NgdsFormModule.forRoot(),
		NgdsTabModule.forRoot(),
		NgdsBlockModule.forRoot(),
		NgZorroAntdModule.forRoot(),
		NgdsPipeModule.forRoot()
	],
	exports: NGB_MODULES
})
export class NgdsRootModule {
}

@NgModule({ imports: NGB_MODULES, exports: NGB_MODULES })
export class NgdsModule {
	static forRoot(): ModuleWithProviders { return { ngModule: NgdsRootModule }; }
}
