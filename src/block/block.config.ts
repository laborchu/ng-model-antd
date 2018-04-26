import { Injectable,PipeTransform } from '@angular/core';
import { NgdsDataSource,NgdsModel } from '../core/datasource';

@Injectable()
export class NgdsBlockConfig {
}

export class NgdsBlockOption {
    title: string;
    buttons?: Array<NgdsBlockBtnOption>;    
}
export interface NgdsBlockBtnOption {
    text: string;
    action: (data: any) => void;
}

export class NgdsBlockInfoOption {
	dataSource: NgdsDataSource|any;
    col?:number;
    items:Array<NgdsBlockInfoItemOption>;
}

export type pipeFunc = (property: string,data:any) => string;
export class NgdsBlockInfoItemOption {
    label:string;
    field:string;
    width?:number;
    fomart?:string;
    type?:'text'|'image'|'date';
    span?:number;
	pipe?: PipeTransform | pipeFunc | PipeTransform[];
}