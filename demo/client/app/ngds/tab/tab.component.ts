import {Component, OnInit} from '@angular/core';

import {NgdsTabOption} from '../../../../../src/index';
import {NgdsDataGridOption, NgdsDataSource, NgdsDsModel, NgdsDsDataGridModel} from '../../../../../src/index';

class AuthStatusDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsDsModel> {
        return new Promise<NgdsDsModel>((resolve, reject) => {
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
    moduleId: module.id,
    templateUrl: 'tab.component.html',
    styleUrls: ['tab.component.css'],
})
export class TabComponent implements OnInit {

    constructor() {
    }

    tabOption: NgdsTabOption = {
        tabSource:new AuthStatusDataSource(),
        tabSelect:(data:any)=>{

        }
    }


    /**
     * Get the names OnInit
     */
    ngOnInit() {
    }


}
