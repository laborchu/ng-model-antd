import {
    Component,
    AfterContentChecked,
    ViewChildren,
    ViewChild,
    QueryList,
    ElementRef,
    Output,
    EventEmitter,
    Input
} from '@angular/core';

import { AnimationBuilder, animate, style } from '@angular/animations';

import { NgdsBlockConfig, NgdsBlockOption, NgdsBlockBtnOption } from './block.config';

@Component({
    selector: 'ngds-block',
    exportAs: 'ngdsBlock',
    template: `
    <nz-card style="width:100%;" class="ngds-block" [nzTitle]="option.title" [nzExtra]="extraTemplate">
        <ng-content></ng-content>
    </nz-card>
    <ng-template #extraTemplate>
        <a *ngFor="let btn of option.buttons;" (click)="btn.action()">
        {{getBtnText(btn)}}
        </a>
    </ng-template>
    `
})
export class NgdsBlock {
    constructor() {
    }

    @Input() option: NgdsBlockOption;

    ngOnInit() {
    }

    getBtnText(btn: NgdsBlockBtnOption) {
        if (typeof btn.text == 'function') {
            return btn.text()
        } else {
            return btn.text;
        }
    }

    ngAfterViewInit(): void {

    }
}
