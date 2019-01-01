import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF,registerLocaleData } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { createInputTransfer, createNewHosts, removeNgStyles } from '@angularclass/hmr';
import { NgZorroAntdModule, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from 'ng-zorro-antd';
import { IconDefinition } from '@ant-design/icons-angular';


import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

import { EditOutline, UserOutline, MenuFoldOutline, PlusCircleOutline } from '@ant-design/icons-angular/icons';
const icons: IconDefinition[] = [EditOutline, UserOutline, MenuFoldOutline, PlusCircleOutline];

// import { MDBBootstrapModule } from 'angular-bootstrap-md';
// MDBBootstrapModule.forRoot(),

import { AppRoutingModule } from './app-routing.module';

import { DataGridComponent, DemoColumnComponent, PanelComponent, FormComponent, TabComponent, BlockComponent } from './ngds/index';
import { SharedModule } from './shared/shared.module';

import { NgdsModule } from '../../../lib/index';

require('../../../node_modules/ng-zorro-antd/ng-zorro-antd.css');
// import '../../../lib/ngds.scss';

@NgModule({
	imports: [BrowserModule, BrowserAnimationsModule, HttpModule, AppRoutingModule,
		NgdsModule.forRoot(),
		SharedModule.forRoot()],
	declarations: [AppComponent, DataGridComponent, DemoColumnComponent, PanelComponent, FormComponent, TabComponent, BlockComponent],
	providers: [{
		provide: APP_BASE_HREF,
		useValue: '/'
	}, { provide: NZ_ICONS, useValue: icons }],
	entryComponents: [DemoColumnComponent],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(public appRef: ApplicationRef) { }

	hmrOnInit(store: any) {
		if (!store || !store.state) return;
		console.log('HMR store', store);
		console.log('store.state.data:', store.state.data)
		// inject AppStore here and update it
		// this.AppStore.update(store.state)
		if ('restoreInputValues' in store) {
			store.restoreInputValues();
		}
		// change detection
		this.appRef.tick();
		delete store.state;
		delete store.restoreInputValues;
	}
	hmrOnDestroy(store: any) {
		var cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
		// recreate elements
		store.disposeOldHosts = createNewHosts(cmpLocation)
		// inject your AppStore and grab state then set it on store
		// var appState = this.AppStore.get()
		store.state = { data: 'yolo' };
		// store.state = Object.assign({}, appState)
		// save input values
		store.restoreInputValues = createInputTransfer();
		// remove styles
		removeNgStyles();
	}
	hmrAfterDestroy(store: any) {
		// display new elements
		store.disposeOldHosts()
		delete store.disposeOldHosts;
		// anything you need done the component is removed
	}
}

