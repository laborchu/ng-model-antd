import { Component, Inject, OnInit, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderStatus' })
export class OrderStatusPipe implements PipeTransform {
	public transform(value:any): string {
		if (value == 1) {
			return "已完成";
		} else {
			return "未完成";
		}
	}
}