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

import { NgdsTabConfig, NgdsTabOption } from './tab.config';
import { debug } from 'util';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngds-tab',
    exportAs: 'ngdsTab',
   
    template: `
        <div class="ngds-tab">
            <div class="ngds-tab-body">
                <div #tabBar [style.width.px]="selectElemWidth" class="ngds-tab-bar"></div>
                <div class="ngds-tab-item" [ngClass]="{'tab-select':selectIndex==i}" 
                #tabComp *ngFor="let tab of tabArray; let i = index" (click)="tabSelect($event,i)">
                {{tab.label}}
                </div>
            </div>
        </div>
    `
})
export class NgdsTab {
    constructor(config: NgdsTabConfig,
        private animBuilder: AnimationBuilder) {
    }

    @Input() option: NgdsTabOption;
    tabArray: Array<any>;
    @ViewChildren('tabComp') tabCompArray: QueryList<ElementRef>;
    @ViewChild('tabBar') tabBar: ElementRef;
    @Output() ngdsTabSelect: EventEmitter<any> = new EventEmitter();

    selectElemWidth: number = 0;
    selectIndex: number = 0;

    ngOnInit() {
        this.option.tabSource.getData({}).then((data: Array<any>) => {
            this.tabArray = data
        });
    }

    ngAfterViewInit(): void {
        this.tabCompArray.changes.subscribe((comps: QueryList<ElementRef>) => {
            setTimeout(() => {
                this.selectElemWidth = comps.toArray()[0].nativeElement.offsetWidth;
            }, 0)
        });

    }

    tabSelect(event: any,index:number) {
        this.selectIndex = index;
        const progressAnimation = this.animBuilder.build([
            animate(`200ms`, style({
                'left': event.currentTarget.offsetLeft,
                'width':event.currentTarget.offsetWidth
            }))
        ]);
        let animationPlayer = progressAnimation.create(this.tabBar.nativeElement);
        animationPlayer.play();
        this.ngdsTabSelect.emit(this.tabArray[index]);
    }

}
