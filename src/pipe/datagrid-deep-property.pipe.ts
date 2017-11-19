import { Component, Inject, OnInit, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'datagridDeepProperty' })
export class DatagridDeepPropertyPipe implements PipeTransform {
	public transform(property: string, data: any): string {
		let propertyArray: Array<string> = property.split(".");
		let value = data;
		for (let p of propertyArray){
			if (!value){
				value = "";
				break;
			}
			value = value[p];
		}
		return value;
	}
}