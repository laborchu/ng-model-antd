import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

// import { MDBBootstrapModule } from 'angular-bootstrap-md';
		// MDBBootstrapModule.forRoot(),

import { AppRoutingModule } from './app-routing.module';

import { DataGridComponent,DemoColumnComponent,PanelComponent,FormComponent,TabComponent,BlockComponent } from './ngds/index';
import { SharedModule } from './shared/shared.module';

import { NgdsModule } from '../../../src/index';

@NgModule({
	imports: [BrowserModule,BrowserAnimationsModule, HttpModule, AppRoutingModule,
		NgdsModule.forRoot(),
		SharedModule.forRoot()],
	declarations: [AppComponent, DataGridComponent,DemoColumnComponent, PanelComponent, FormComponent,TabComponent,BlockComponent],
	providers: [{
		provide: APP_BASE_HREF,
		useValue: '<%= APP_BASE %>'
	}],
	entryComponents:[DemoColumnComponent],
	bootstrap: [AppComponent]

})
export class AppModule { }
