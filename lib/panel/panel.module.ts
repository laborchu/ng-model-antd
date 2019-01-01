import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { NgdsPanel } from './panel';
import {
	NgdsPanelConfig, NgdsPanelOption, NgdsPanelCrumbsOption
} from './panel.config';

export { NgdsPanel } from './panel';
export {
	NgdsPanelConfig, NgdsPanelOption,NgdsPanelCrumbsOption
} from './panel.config';

const NGB_TABSET_DIRECTIVES = [NgdsPanel];

@NgModule({ declarations: NGB_TABSET_DIRECTIVES, exports: NGB_TABSET_DIRECTIVES, imports: [CommonModule,NgZorroAntdModule] })
export class NgdsPanelModule {
	static forRoot(): ModuleWithProviders { return { ngModule: NgdsPanelModule, providers: [NgdsPanelConfig] }; }
}
