import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { NgdsBlock } from './block';
import { NgdsBlockInfo } from './block-info';
import {
	NgdsBlockConfig, NgdsBlockOption,NgdsBlockInfoOption,NgdsBlockInfoItemOption
} from './block.config';

export { NgdsBlock } from './block';
export { NgdsBlockInfo } from './block-info';
export {
	NgdsBlockConfig, NgdsBlockOption,NgdsBlockInfoOption,NgdsBlockInfoItemOption
} from './block.config';

const NGB_TABSET_DIRECTIVES = [NgdsBlock,NgdsBlockInfo];

@NgModule({ declarations: NGB_TABSET_DIRECTIVES, exports: NGB_TABSET_DIRECTIVES, imports: [CommonModule,NgZorroAntdModule] })
export class NgdsBlockModule {
	static forRoot(): ModuleWithProviders { return { ngModule: NgdsBlockModule, providers: [NgdsBlockConfig] }; }
}
