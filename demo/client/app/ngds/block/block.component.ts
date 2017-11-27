import {Component, OnInit} from '@angular/core';

import {NgdsBlockOption,NgdsBlockInfoOption,NgdsDataGridOption,NgdsDataSource,NgdsDataGridModel,NgdsModel} from '../../../../../src/index';

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

class Block1DataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsModel> {
        return new Promise<NgdsModel>((resolve, reject) => {
            setTimeout(()=>{
                resolve({
                    data: { field1: new Date(), field2: "已取货", field3: "1234123421", field4: "3214321432" }
                });
            },2000)
            
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
        dataSource:new Block1DataSource(),
        col:1,
        items:[
            {label:"取货单号",field:"field1",type:"date",fomart:"yyyy-MM-dd HH:mm:ss"},
            {label:"状态",field:"field2"},
            {label:"销售单号",field:"field3"},
            {label:"子订单",field:"field4"}
        ]
    }

    block2Option: NgdsBlockOption = {
        title:"一行两列"
    }
    blockInfo2Option:NgdsBlockInfoOption = {
        dataSource:new Block1DataSource(),
        col:2,
        items:[
            {label:"取货单号",field:"field1"},
            {label:"状态",field:"field2"},
            {label:"销售单号",field:"field3"},
            {label:"子订单",field:"field4"}
        ]
    }

    block3Option: NgdsBlockOption = {
        title:"一行三列"
    }
    blockInfo3Option:NgdsBlockInfoOption = {
        dataSource:new Block1DataSource(),
        col:3,
        items:[
            {label:"取货单号",field:"field1"},
            {label:"状态",field:"field2"},
            {label:"销售单号",field:"field3"},
            {label:"子订单",field:"field4"}
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
