import {Component, OnInit} from '@angular/core';

import {NgdsBlockOption,NgdsBlockInfoOption,NgdsDataGridOption,NgdsDataSource,NgdsDataGridModel} from '../../../../../src/index';

class DemoDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsDataGridModel> {
        return new Promise<NgdsDataGridModel>((resolve, reject) => {
            let date = new Date();
            setTimeout(() => {
                resolve({
                    page: {
                        pageSize: 10,
                        pageCount: 10,
                        pageIndex: 10,
                    },
                    data: [
                        { username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1, org: { name: 1 } },
                        { username: "13999", name: "胡立波", mobile: "13333333331", authStatus: 0 },
                        { username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1 },
                        { username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1 },
                        { username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 0 },
                        { username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1 },
                        { username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1 },
                        { username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1 },
                    ]
                });
            }, 1000)

        });
    }
}

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    templateUrl: 'block.component.html',
    styleUrls: ['block.component.css'],
})
export class BlockComponent implements OnInit {

    constructor() {
    }

    blockOption: NgdsBlockOption = {
        title:"一行一列"
    }
    blockInfoOption:NgdsBlockInfoOption = {
        col:1,
        items:[
            {label:"取货单号",text:"1000000000"},
            {label:"状态",text:"已取货"},
            {label:"销售单号",text:"1234123421"},
            {label:"子订单",text:"3214321432"}
        ]
    }

    block2Option: NgdsBlockOption = {
        title:"一行两列"
    }
    blockInfo2Option:NgdsBlockInfoOption = {
        col:2,
        items:[
            {label:"取货单号",text:"1000000000"},
            {label:"状态",text:"已取货"},
            {label:"销售单号",text:"1234123421"},
            {label:"子订单",text:"3214321432"}
        ]
    }

    block3Option: NgdsBlockOption = {
        title:"一行三列"
    }
    blockInfo3Option:NgdsBlockInfoOption = {
        col:3,
        items:[
            {label:"取货单号",text:"1000000000"},
            {label:"状态",text:"已取货"},
            {label:"销售单号",text:"1234123421"},
            {label:"子订单",text:"3214321432"}
        ]
    }

    block4Option: NgdsBlockOption = {
        title:"表格数据"
    }

    tableOption: NgdsDataGridOption = {
        dataSource: new DemoDataSource(),
        table: {
            showCheck: false,
            columns: [
                { text: '用户名', property: "username", width: "60px" },
                { text: '姓名', property: "name", width: "80px" },
                { text: '手机号', property: "mobile", width: "80px" }
            ],
        }
    }
    /**
     * Get the names OnInit
     */
    ngOnInit() {
    }
}
