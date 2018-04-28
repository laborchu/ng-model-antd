import {
    Component,
    AfterContentChecked,
    ViewContainerRef,
    Input,
    EventEmitter,
    Output,
    ViewChild,
    ComponentFactory,
    ComponentFactoryResolver,
    PipeTransform
} from '@angular/core';

import {
    NgdsDataGridConfig, NgdsDataGridOption, NgdsDataGridOpBtnOption, pipeFunc,
    NgdsDataGridColumnOption, NgdsDataGridModel, NgdsDataGridPageModel
} from './datagrid.config';

@Component({
    selector: 'ngds-column',
    exportAs: 'ngdsColumn',
    template: `
    <span #columnRef>
        <span *ngIf="!hasCustomComp">
            <nz-badge *ngIf="colOption.badgePipe" [nzStatus]="getValueFromPipe(colOption.badgePipe)"></nz-badge>
            <span [innerHTML]="getValueFromPipe(colOption.propertyPipe)"></span>
        </span>
    </span>
    `
})
export class NgdsColumn {
    constructor(private cfr: ComponentFactoryResolver,) {
    }

    @ViewChild("columnRef", { read: ViewContainerRef }) columnRef: ViewContainerRef;
    @Input() colOption: NgdsDataGridColumnOption;
    @Input() item: any;
    hasCustomComp:boolean = false;

    ngOnInit() {
        if(this.colOption.component){
            this.hasCustomComp = true;
            let compFactory: ComponentFactory<any> = this.cfr.resolveComponentFactory(this.colOption.component);
            let comp = this.columnRef.createComponent(compFactory);
            comp.instance.colOption = this.colOption;
            comp.instance.item = this.item;
        }
        
    }

    getValueFromPipe = function (pipe: PipeTransform | pipeFunc | PipeTransform[]) {
        if (pipe) {
            if (typeof pipe === "function") {
                return pipe(this.colOption.property, this.item);
            } else {
                if (Array.isArray(pipe)) {
                    let value: any;
                    for (let pipeItem of pipe) {
                        if (typeof pipeItem === "function") {
                            value = pipeItem(this.colOption.property, this.item, value);
                        } else {
                            value = pipeItem.transform(this.colOption.property, this.item, value);
                        }
                    }
                    return value;
                } else {
                    return pipe.transform(this.colOption.property, this.item);
                }
            }
        } else {
            return this.item[this.colOption.property];
        }
    }
}
