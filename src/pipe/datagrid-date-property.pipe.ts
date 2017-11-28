import { Component, Inject, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from "@angular/common";

@Pipe({ name: 'datagridDateProperty' })
export class DatagridDatePropertyPipe implements PipeTransform {
	private fomart:string = 'yyyy-MM-dd HH:mm:ss';
	public transform(property: string, data: any,value?:any): string {
		var datePipe = new DatePipe('en-US');
		if(!value){
			value = data[property];
		}
		return datePipe.transform(value, 'yyyy-MM-dd');
	}

	public setFomart(fomart:string):DatagridDatePropertyPipe{
		this.fomart = fomart;
		return this;
	}
}