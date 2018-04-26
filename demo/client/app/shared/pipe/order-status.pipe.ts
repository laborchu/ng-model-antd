import { Component, Inject, OnInit, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderStatus' })
export class OrderStatusPipe implements PipeTransform {
	public transform(property: string,data:any): string {
		if (data[property] == 1) {
			return "已完成";
		} else {
			return "未完成";
		}
	}
}