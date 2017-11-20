import { Injectable, PipeTransform } from '@angular/core';
import { NgdsDataSource,NgdsModel } from '../core/datasource';

/**
 * Configuration service for the NgbTabset component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tabsets used in the application.
 */
@Injectable()
export class NgdsDataGridConfig {
}

export interface NgdsDataGridModel extends NgdsModel {
	page: NgdsDataGridPageModel;
	data: Array<any>;
}

export interface NgdsDataGridPageModel extends NgdsModel {
	pageSize?: number; //每页个数
	pageCount: number; //页面总数
	pageIndex: number;//当前页数
}

export type styleFunc = (data: any) => string;
export type pipeFunc = (property: string,data:any) => string;
export type textFunc = (data:any) => string;

export interface NgdsDataGridOption {
	dataSource: NgdsDataSource;
	table: NgdsDataGridTableOption;
}

export interface NgdsDataGridTableOption {
	columns: Array<NgdsDataGridColumnOption>;
	op?: NgdsDataGridOpOption;
	showCheck?:boolean;
}

export interface NgdsDataGridColumnOption {
	text: string;
	property: string;
	propertyPipe?: PipeTransform | pipeFunc | PipeTransform[];
	width?: string;
	title?:boolean;
	overflow?: boolean;
	showSort?: boolean;
	propertyClassPipe?: PipeTransform | PipeTransform[];
}

export interface NgdsDataGridOpOption {
	width?: string;
	buttons: Array<NgdsDataGridOpBtnOption>;
	groupButtons?: Array<NgdsDataGridOpGroupBtnOption>;
}

export interface NgdsDataGridOpGroupBtnOption {
	text: string;
	buttons: Array<NgdsDataGridOpBtnOption>;
    hidden?: (data: any) => boolean;
}

export interface NgdsDataGridOpBtnOption {
	text: string | textFunc;
	style?: string | styleFunc;
	action: (data: any) => void;
	hidden?: (data: any) => boolean;
}
