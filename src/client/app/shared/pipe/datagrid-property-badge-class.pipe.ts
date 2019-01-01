import { Component, Inject, OnInit, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'datagridPropertyBadge' })
export class DatagridPropertyBadgePipe implements PipeTransform {
	public transform(value:any): string {
		if (value == 1) {
			return "badge green";
		} else {
			return "badge grey";
		}
	}
}