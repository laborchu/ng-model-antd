import {
    Component,
    Input
} from '@angular/core';

import { AnimationBuilder, animate, style } from '@angular/animations';

import { NgdsBlockConfig, NgdsBlockOption,NgdsBlockInfoOption } from './block.config';
import { debug } from 'util';

@Component({
    selector: 'ngds-block-info',
    exportAs: 'ngdsBlockInfo',
    template: `
    <div nz-row class="ngds-block-info">
        <div class="info-item" nz-col [nzSpan]="_span" *ngFor="let item of option.items">
            <span class="info-label">{{item.label}}</span>
            <span>{{item.text}}</span>
        </div>
    </div>
    `
})
export class NgdsBlockInfo {
    constructor(config: NgdsBlockConfig) {
    }
    

    @Input() option: NgdsBlockInfoOption;
    _span:number;
    ngOnInit() {
        if(!this.option.col){
            this.option.col = 3;
        }
        this._span = parseInt(24/this.option.col+"");
    }
}
