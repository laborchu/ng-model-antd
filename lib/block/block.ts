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

import { NgdsBlockConfig, NgdsBlockOption } from './block.config';

@Component({
    selector: 'ngds-block',
    exportAs: 'ngdsBlock',
    template: `
    <nz-card style="width:100%;" class="ngds-block" [nzTitle]="option.title" [nzExtra]="extraTemplate">
        <ng-content></ng-content>
    </nz-card>
    <ng-template #extraTemplate>
        <a *ngFor="let btn of option.buttons;" (click)="btn.action()">
            {{btn.text}}
        </a>
    </ng-template>
    `
})
export class NgdsBlock {
    constructor(config: NgdsBlockConfig,
        private animBuilder: AnimationBuilder) {
    }

    @Input() option: NgdsBlockOption;

    ngOnInit() {
    }

    ngAfterViewInit(): void {

    }
}
