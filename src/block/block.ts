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
    <nz-card style="width:100%;" class="ngds-block">
        <ng-template #title>
            {{option.title}}
        </ng-template>
        <ng-template #body>
            <ng-content></ng-content>
        </ng-template>
    </nz-card>
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
