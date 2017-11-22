import { Injectable } from '@angular/core';
import { NgdsDataSource,NgdsModel } from '../core/datasource';

@Injectable()
export class NgdsBlockConfig {
}

export class NgdsBlockOption {
    title: string;
}

export class NgdsBlockInfoOption {
    col?:number;
    items:Array<NgdsBlockInfoItemOption>;
}

export class NgdsBlockInfoItemOption {
    label:string;
    text:string;
}