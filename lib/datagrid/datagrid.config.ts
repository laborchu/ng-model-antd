import { Injectable, PipeTransform } from '@angular/core';
import { NgdsDataSource, NgdsModel } from '../core/datasource';

/**
 * Configuration service for the NgbTabset component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tabsets used in the application.
 */
@Injectable()
export class NgdsDataGridConfig {
}

export interface NgdsDataGridModel extends NgdsModel {
	page?: NgdsDataGridPageModel;
	data: Array<any>;
}

export interface NgdsDataGridPageModel extends NgdsModel {
	pageSize?: number; //每页个数
	pageCount: number; //页面总数
	totalCount: number;//当前页数
}

export type styleFunc = (data: any) => string;
export type loadingFunc = (data: any) => boolean;
export type permFunc = (data: any) => string;
export type pipeFunc = (property: string, data: any) => string | boolean;
export type textFunc = (data: any) => string;
export type editFinishFunc = (item: any) => void;
export type canEditFunc = (item: any) => boolean;
export type clickFunc = (item: any) => void;
export type expandChange = (item: any, extend: any) => void;
export type onSelect = () => void;

export interface NgdsDataGridOption {
	dataSource: NgdsDataSource | Array<any>;
	table: NgdsDataGridTableOption;
	initToSearch?: boolean;
	dataKey?: string;
	disableCached?: boolean;
	permMap?: any;
}

export interface NgdsDataGridTableOption {
	columns: Array<NgdsDataGridColumnOption>;
	op?: NgdsDataGridOpOption;
	showCheck?: boolean;
	expandChange?: expandChange;
	selections?: Array<NgdsDataGridSelectionsOption>;
}

export interface NgdsDataGridSelectionsOption {
	text: string;
	onClick: clickFunc;
	onSelect?: onSelect;
}

export interface NgdsDataGridColumnOption {
	text: string;
	property: string;
	subProperty?: string;
	propertyPipe?: PipeTransform | pipeFunc | PipeTransform[];
	subPropertyPipe?: PipeTransform | pipeFunc | PipeTransform[];
	badgePipe?: PipeTransform | pipeFunc | PipeTransform[];
	width?: string;
	title?: boolean;
	overflow?: boolean;
	showSort?: boolean;
	hidden?: boolean;
	propertyClassPipe?: PipeTransform | PipeTransform[];
	component?: any;
	canEdit?: boolean | canEditFunc;
	editFinish?: editFinishFunc;
	click?: clickFunc;
	subPropertyClick?: clickFunc;
	info?: string | pipeFunc;
	tags?: Array<NgdsDataGridColumnTagOption>;
}

export interface NgdsDataGridColumnTagOption {
	tagColor: string | pipeFunc;
	tagLabel: string | pipeFunc;
	show?: string | pipeFunc;
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
	key?: number;
	text: string | textFunc;
	style?: string | styleFunc;
	loading?: boolean;
	action: (data: any) => void | Promise<any>;
	hidden?: (data: any) => boolean;
	permCode?: string | permFunc;
}
