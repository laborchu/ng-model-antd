import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgdsModule } from '../../../../src/index';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { DatagridPropertyPipe, DatagridPropertyBadgePipe } from './pipe/index';
/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [CommonModule, RouterModule, NgdsModule,NgZorroAntdModule],
  declarations: [],
  exports: [CommonModule, FormsModule, RouterModule, NgdsModule,NgZorroAntdModule],
  providers: [DatagridPropertyPipe, DatagridPropertyBadgePipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
