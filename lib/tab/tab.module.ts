import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgdsTab } from './tab';
import {
	NgdsTabConfig, NgdsTabOption,
} from './tab.config';

export { NgdsTab } from './tab';
export {
	NgdsTabConfig, NgdsTabOption
} from './tab.config';

const NGB_TABSET_DIRECTIVES = [NgdsTab];

@NgModule({ declarations: NGB_TABSET_DIRECTIVES, exports: NGB_TABSET_DIRECTIVES, imports: [CommonModule] })
export class NgdsTabModule {
	static forRoot(): ModuleWithProviders { return { ngModule: NgdsTabModule, providers: [NgdsTabConfig] }; }
}
