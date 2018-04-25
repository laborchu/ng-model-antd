import {
    Component,
    Input
} from '@angular/core';
import { DatePipe } from "@angular/common";
import { AnimationBuilder, animate, style } from '@angular/animations';

import { NgdsBlockConfig, NgdsBlockOption,NgdsBlockInfoOption,NgdsBlockInfoItemOption } from './block.config';
import { NgdsDataSource,NgdsModel } from '../core/datasource';

@Component({
    selector: 'ngds-block-info',
    exportAs: 'ngdsBlockInfo',
    template: `
    <div class="ngds-block-info">
        <div nz-row  *ngIf="!_isSpinning">
            <div class="info-item" nz-col [nzSpan]="item.span?item.span:_span" *ngFor="let item of option.items">
                <span class="info-label">{{item.label}}</span>
                <span *ngIf="item.type!='image'" [innerHTML]="getText(item)">
                </span>
                <span *ngIf="item.type=='image'">
                    <img src="{{data[item.field]}}" [style.width.px]="item.width"/>
                </span>
            </div>
        </div>
        <nz-spin [nzSpinning]="_isSpinning" class="block-spin"></nz-spin>
    </div>
   
    `
})
export class NgdsBlockInfo {
    constructor(config: NgdsBlockConfig,protected datePipe: DatePipe) {
    }
    

    @Input() option: NgdsBlockInfoOption;
    _span:number;
    data:any = {};
    _isSpinning:boolean = true;
    ngOnInit() {
        if(!this.option.col){
            this.option.col = 3;
        }
        if(this.option.items){
            for(let item of this.option.items){
                if(!item.type){
                    item.type = "text";
                } 
            }
        }
        this._span = parseInt(24/this.option.col+"");
        if(this.option.dataSource.getData){
            this.option.dataSource.getData({}).then((model: any) => {
                this.data = model.data;
                this._isSpinning = false;
            });
        }else{
            this.data = this.option.dataSource;
            this._isSpinning = false;
        }
        
    }

    getText(item:NgdsBlockInfoItemOption):string{
        if(item.type=="date"){
            return this.datePipe.transform(this.data[item.field], item.fomart);
        }else{
            if(item.pipe){
                if (typeof item.pipe === "function") {
                    return item.pipe(this.data[item.field]);
                  } else {
                    if (Array.isArray(item.pipe)) {
                      let value: any;
                      for (let pipeItem of item.pipe) {
                        if (typeof pipeItem === "function") {
                          value = pipeItem(this.data[item.field]);
                        } else {
                          value = pipeItem.transform(this.data[item.field]);
                        }
                      }
                      return value;
                    } else {
                      return item.pipe.transform(this.data[item.field]);
                    }
                  }
            }else{
                return this.data[item.field];
            }
        }
    }

    update(data:any):void{
        Object.assign(this.data,data);
    }
}
