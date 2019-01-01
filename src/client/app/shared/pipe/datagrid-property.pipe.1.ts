import { Component, Inject, OnInit, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'datagridProperty' })
export class DatagridPropertyPipe implements PipeTransform {
	public transform(property: string,data:any): string{
		if (data[property] == 1) {
			return "已经认证";
		}else{
			return "未认证";
		}
	}
}