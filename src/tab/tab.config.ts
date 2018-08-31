import { Injectable } from '@angular/core';
import { NgdsDataSource,NgdsModel } from '../core/datasource';

export type tabSelect = (data:any) => void;
/**
 * Configuration service for the NgbTabset component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tabsets used in the application.
 */
@Injectable()
export class NgdsTabConfig {

}

export class NgdsTabOption {
    id?:string;
    tabSource: NgdsDataSource;
}

