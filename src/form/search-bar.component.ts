import {
    Component,
    AfterContentChecked,
    ViewContainerRef,
    ViewChild,
    ComponentFactoryResolver,
    Input
} from '@angular/core';
import { NgdsFormConfig, NgdsFormSearchOption } from './form.config';
import { NgdsModel } from '../core/datasource';
import { NgdsFormComp } from './form.component';


/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngds-form-search',
    template: `
    <div class="search-bar" nz-col [nzSpan]="option.span" [nzOffset]="option.offset">
        <div nz-form-item nz-row>
            <div nz-form-label nz-col [nzSpan]="option.labelSpan">
            </div>
            <div nz-form-control nz-col [nzSpan]="option.compSpan">
                <button nz-button [nzType]="'primary'" (click)="search()">查询</button>
                <span class="split-btn"></span>
                <button nz-button (click)="reset()">重置</button>
            </div>
        </div>
    </div>
    `
})
export class NgdsFormSearchBar extends NgdsFormComp implements AfterContentChecked {
    constructor() {
        super();
    }

    option: NgdsFormSearchOption;
    ngOnInit() {
       
    }

    onChange() {
    }

    ngAfterContentChecked() {
    }

    search(){
        let data = this.option.formComp.getValue();
        this.option.formComp.onSearch.emit(data);
    }
    reset(){
        this.option.formComp.setValue({});
        let data = this.option.formComp.getValue();
        this.option.formComp.onSearch.emit(data);
    }

}
