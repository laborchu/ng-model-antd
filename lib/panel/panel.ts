import {
    Component,
    AfterContentChecked,
    Input
} from '@angular/core';
import { NgdsPanelConfig, NgdsPanelOption, NgdsPanelBtnOption } from './panel.config';
import { permFunc } from '../datagrid/datagrid.config';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngds-panel',
    exportAs: 'ngdsPanel',
    template: `
        <nz-card style="width:100%;" class="ngds-panel" [nzTitle]="titleTemplate" [nzExtra]="extraTemplate">
            <ng-content></ng-content>
        </nz-card>
        <ng-template #titleTemplate>
            <nz-breadcrumb>
                <nz-breadcrumb-item *ngFor="let crumb of option.crumbs;">
                    <a (click)="crumb.action&&crumb.action()" *ngIf="crumb.action">{{crumb.text}}</a>
                    <span *ngIf="!crumb.action">{{crumb.text}}</span>
                </nz-breadcrumb-item>
            </nz-breadcrumb>
        </ng-template>
        <ng-template #extraTemplate>
            <a *ngFor="let btn of option.buttons;"
                [ngClass]="{'btn-disable':btn.loading}" 
                    (click)="btnClick(btn)" [hidden]="btn.hidden||!hasPerm(btn.permCode)">
                <i nz-icon type="loading" theme="outline" [spin]="true" *ngIf="btn.loading"></i>
                {{btn.text}}
            </a>
        </ng-template>
    `
})
export class NgdsPanel implements AfterContentChecked {
    constructor() {
    }

    @Input() option: NgdsPanelOption;

    ngOnInit() {

    }

    getBtnStyle = function (btn: NgdsPanelBtnOption, item: any) {
        if (btn.style) {
            return btn["style"];
        } else {
            return 'btn-default';
        }
    }

    hasPerm(permCode: string | permFunc) {
        if (this.option.permMap == undefined || permCode == undefined) {
            return true;
        }
        if (permCode == 'function') {
            let code = (<any>permCode)();
            return this.option.permMap[code] ? true : false;
        } else {
            return this.option.permMap[<string>permCode] ? true : false;
        }
    }

    btnClick(btn: NgdsPanelBtnOption) {
        if (!btn.loading) {
            let result = btn.action(null);
            if (result && result instanceof Promise) {
                btn.loading = true;
                result.then(() => {
                    btn.loading = false;
                }).catch(() => {
                    btn.loading = false;
                })
            }
        }
    }

    ngAfterContentChecked() {
    }

}
