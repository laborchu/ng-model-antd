import {
    Component,
    AfterContentChecked,
    Input
} from '@angular/core';
import {NgdsPanelConfig, NgdsPanelOption, NgdsPanelBtnOption} from './panel.config';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngds-panel',
    exportAs: 'ngdsPanel',
    template: `
        <nz-card style="width:100%;" class="ngds-panel">
            <ng-template #title>
                <nz-breadcrumb>
                    <nz-breadcrumb-item *ngFor="let crumb of option.crumbs;">
                        <a (click)="crumb.action&&crumb.action()" *ngIf="crumb.action">{{crumb.text}}</a>
                        <span *ngIf="!crumb.action">{{crumb.text}}</span>
                    </nz-breadcrumb-item>
                </nz-breadcrumb>
            </ng-template>
            <ng-template #extra>
                <a *ngFor="let btn of option.buttons;"
                        (click)="btn.action()" [hidden]="btn.hidden">
                    {{btn.text}}
                </a>
            </ng-template>
            <ng-template #body>
                <ng-content></ng-content>
            </ng-template>
        </nz-card>

    `
})
export class NgdsPanel implements AfterContentChecked {
    constructor(config: NgdsPanelConfig) {
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

    ngAfterContentChecked() {
    }

}
