import { Injectable } from '@angular/core';
import { NgdsDataSource,NgdsModel } from '../core/datasource';

@Injectable()
export class NgdsBlockConfig {
}

export class NgdsBlockOption {
    title: string;
}

export class NgdsBlockInfoOption {
	dataSource: NgdsDataSource|any;
    col?:number;
    items:Array<NgdsBlockInfoItemOption>;
}

export class NgdsBlockInfoItemOption {
    label:string;
    field:string;
    width?:number;
    type?:'text'|'image';
}