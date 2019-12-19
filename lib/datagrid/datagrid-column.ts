import { Component, ComponentFactory, ComponentFactoryResolver, Inject, Input, PipeTransform, ViewChild, ViewContainerRef } from '@angular/core';
import { NgdsDataGridColumnOption, NgdsDataGridColumnTagOption, pipeFunc } from './datagrid.config';


@Component({
    selector: 'ngds-column',
    exportAs: 'ngdsColumn',
    template: `
    <span class="dg-column" #columnRef>
        <span *ngIf="!hasCustomComp">
            <nz-badge *ngIf="colOption.badgePipe" [nzStatus]="getValueFromPipe(colOption.badgePipe,colOption.property)"></nz-badge>
            <span *ngIf="!edit&&!colOption.click" [innerHTML]="getValueFromPipe(colOption.propertyPipe,colOption.property)" >
            </span>
            <span *ngIf="colOption.click">
                <a (click)="colOption.click(item)">{{getValueFromPipe(colOption.propertyPipe,colOption.property)}}</a>
            </span> 

            <span class="column-tag" *ngIf="colOption.tags&&colOption.tags.length">
                <span nz-tooltip nzTooltipTitle="{{tag.tip}}" *ngFor="let tag of colOption.tags">
                    <nz-tag *ngIf="tag.show?tag.show(colOption.property,item):true" [nzColor]="getTagColor(tag)">{{getTagLabel(tag)}}</nz-tag>
                </span>
            </span>

            <span *ngIf="colOption.subProperty && !colOption.subPropertyClick" class="sub-property" [innerHTML]="getValueFromPipe(colOption.subPropertyPipe,colOption.subProperty)" >
            </span>
            <span *ngIf="colOption.subProperty && colOption.subPropertyClick">
                <a class="sub-property-click" (click)="colOption.subPropertyClick(item)">{{getValueFromPipe(colOption.subPropertyPipe,colOption.subProperty)}}</a>
            </span> 

            <nz-tooltip [nzTitle]="getInfo(colOption.info)" *ngIf="showInfo(colOption.info)">
                <i nz-tooltip nz-icon type="exclamation-circle" theme="outline"></i>
            </nz-tooltip>

            <span class="edit-input" *ngIf="edit">
              <input nz-input [(ngModel)]="item[colOption.property]" (keyup.enter)="finishEdit()">
              <i nz-icon type="check-circle" theme="outline" (click)="finishEdit()"></i>
              <i nz-icon type="close-circle" theme="outline" (click)="closeEdit()"></i>
            </span>
            <span class="edit-icon" *ngIf="canEdit()&&!edit">
                <i nz-icon type="edit" theme="outline" (click)="startEdit()"></i>
            </span>
            
        </span>
    </span>
    `
})
export class NgdsColumn {
    constructor(@Inject(ComponentFactoryResolver) private cfr: ComponentFactoryResolver, ) {
    }

    @ViewChild("columnRef", { static: true, read: ViewContainerRef }) columnRef: ViewContainerRef;
    @Input() colOption: NgdsDataGridColumnOption;
    @Input() item: any;
    hasCustomComp: boolean = false;
    edit: boolean = false;
    oldValue: any = null;

    ngOnInit() {
        if (this.colOption.component) {
            this.hasCustomComp = true;
            let compFactory: ComponentFactory<any> = this.cfr.resolveComponentFactory(this.colOption.component);
            let comp = this.columnRef.createComponent(compFactory);
            comp.instance.colOption = this.colOption;
            comp.instance.item = this.item;
        }
    }

    canEdit(): boolean {
        if (typeof this.colOption.canEdit === "function") {
            return this.colOption.canEdit(this.item) && !this.item.disableEdit;
        } else {
            return this.colOption.canEdit && !this.item.disableEdit;
        }
    }

    startEdit(): void {
        this.oldValue = this.item[this.colOption.property];
        this.edit = !this.edit;
    }
    closeEdit(): void {
        this.item[this.colOption.property] = this.oldValue;
        this.edit = !this.edit;
    }
    finishEdit(): void {
        this.edit = !this.edit;
        this.colOption.editFinish && this.colOption.editFinish(this.item);
    }

    getInfo(tip: string | pipeFunc): string | boolean {
        if (typeof tip === "function") {
            return tip(this.colOption.property, this.item);
        } else {
            return tip;
        }
    }

    showInfo(tip: string | pipeFunc): boolean {
        let data;
        if (typeof tip === "function") {
            data = tip(this.colOption.property, this.item);
        } else {
            data = tip;
        }
        return data ? true : false;
    }

    getValueFromPipe(pipe: PipeTransform | pipeFunc | PipeTransform[], property: string) {
        if (pipe) {
            if (typeof pipe === "function") {
                return pipe(property, this.item);
            } else {
                if (Array.isArray(pipe)) {
                    let value: any;
                    for (let pipeItem of pipe) {
                        if (typeof pipeItem === "function") {
                            let pipeFunc: any = pipeItem;
                            value = pipeFunc(property, this.item, value);
                        } else {
                            value = pipeItem.transform(property, this.item, value);
                        }
                    }
                    return value;
                } else {
                    return pipe.transform(property, this.item);
                }
            }
        } else {
            return this.item[property];
        }
    }

    getTagColor(tag: NgdsDataGridColumnTagOption) {
        if (typeof tag.tagColor === "function") {
            return tag.tagColor(this.colOption.property, this.item);
        } else {
            return tag.tagColor;
        }
    }

    getTagLabel(tag: NgdsDataGridColumnTagOption) {
        if (typeof tag.tagLabel === "function") {
            return tag.tagLabel(this.colOption.property, this.item);
        } else {
            return tag.tagLabel;
        }
    }
}
