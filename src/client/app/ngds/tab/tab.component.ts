import {Component, OnInit} from '@angular/core';

import {NgdsTabOption, NgdsDataSource, NgdsModel, NgdsDataGridModel} from '../../../../../lib/index';

class AuthStatusDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsModel> {
        return new Promise<NgdsModel>((resolve, reject) => {
            resolve([
                {label: "全部", value: 0},
                {label: "已认证", value: 1},
                {label: "未认证", value: 2}
            ]);
        });
    }
}

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    templateUrl: 'tab.component.html',
    styleUrls: ['tab.component.scss'],
})
export class TabComponent implements OnInit {

    constructor() {
    }

    tabOption: NgdsTabOption = {
        id:"sssss",
        tabSource:new AuthStatusDataSource()
    }


    /**
     * Get the names OnInit
     */
    ngOnInit() {
    }


}
