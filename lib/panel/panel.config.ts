import { Injectable} from '@angular/core';

/**
 * Configuration service for the NgbTabset component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tabsets used in the application.
 */
@Injectable()
export class NgdsPanelConfig {

}

export type crumbsFunc = (data:any) => void;
export type permFunc = (data: any) => string;

export class NgdsPanelOption {
    
	crumbs: Array<NgdsPanelCrumbsOption>
    buttons?: Array<NgdsPanelBtnOption>;
    permMap?: any;

}

export class NgdsPanelCrumbsOption {
	text: string;
	action?: crumbsFunc;
}

export interface NgdsPanelBtnOption {
    text: string;
    style?: string;
    hidden?:boolean;
    action: (data: any) => void;
    permCode?: string | permFunc;
}

