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
let hashMap: Map<string, number> = new Map();

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
                {{tab[option.dsLabel]}}
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
    hash: number;

    ngOnInit() {
        if (!this.option.dsLabel) {
            this.option.dsLabel = "label";
        }

        if(this.option.remember!==false){
            this.selectIndex = hashMap.get(this.option.id || location.pathname) || 0;
        }
        this.option.tabSource.getData({}).then((data: Array<any>) => {
            this.tabArray = data
        });
    }

    ngAfterViewInit(): void {
        this.tabCompArray.changes.subscribe((comps: QueryList<ElementRef>) => {
            setTimeout(() => {
                this.selectElemWidth = comps.toArray()[this.selectIndex].nativeElement.offsetWidth;
                this.move(comps.toArray()[this.selectIndex].nativeElement);
            }, 0)
        });

    }

    tabSelect(event: any, index: number) {
        if(this.option.remember!==false){
            hashMap.set(this.option.id || location.pathname, index);
        }
        this.selectIndex = index;
        this.move(event.currentTarget);
        this.ngdsTabSelect.emit(this.tabArray[index]);
    }

    move(target:any){
        const progressAnimation = this.animBuilder.build([
            animate(`200ms`, style({
                'left': target.offsetLeft,
                'width': target.offsetWidth
            }))
        ]);
        let animationPlayer = progressAnimation.create(this.tabBar.nativeElement);
        animationPlayer.play();
    }

}
