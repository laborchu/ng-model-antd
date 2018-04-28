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
    <span class="dg-column" #columnRef>
        <span *ngIf="!hasCustomComp">
            <nz-badge *ngIf="colOption.badgePipe" [nzStatus]="getValueFromPipe(colOption.badgePipe)"></nz-badge>
            <span *ngIf="!edit" [innerHTML]="getValueFromPipe(colOption.propertyPipe)"></span>

            <span class="edit-input" *ngIf="edit">
              <nz-input [(ngModel)]="item[colOption.property]" (keyup.enter)="finishEdit()"></nz-input>
              <i class="anticon anticon-check editable-cell-icon-check" (click)="finishEdit()"></i>
              <i class="anticon anticon-close" (click)="closeEdit()"></i>
            </span>
            <span class="edit-icon" *ngIf="canEdit()&&!edit">
                <i class="anticon anticon-edit editable-cell-icon" (click)="startEdit()"></i>
            </span>
            
        </span>
    </span>
    `
})
export class NgdsColumn {
    constructor(private cfr: ComponentFactoryResolver, ) {
    }

    @ViewChild("columnRef", { read: ViewContainerRef }) columnRef: ViewContainerRef;
    @Input() colOption: NgdsDataGridColumnOption;
    @Input() item: any;
    hasCustomComp: boolean = false;
    edit: boolean = false;
    oldValue:any = null;

    ngOnInit() {
        if (this.colOption.component) {
            this.hasCustomComp = true;
            let compFactory: ComponentFactory<any> = this.cfr.resolveComponentFactory(this.colOption.component);
            let comp = this.columnRef.createComponent(compFactory);
            comp.instance.colOption = this.colOption;
            comp.instance.item = this.item;
        }
    }

    canEdit():boolean{
        return this.colOption.canEdit&&!this.item.disableEdit;
    }

    startEdit():void{
        this.oldValue = this.item[this.colOption.property];
        this.edit = !this.edit;
    }
    closeEdit():void{
        this.item[this.colOption.property] = this.oldValue;
        this.edit = !this.edit;
    }
    finishEdit():void{
        this.edit = !this.edit;
        this.colOption.editFinish&&this.colOption.editFinish(this.item);
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
