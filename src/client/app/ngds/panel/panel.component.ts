import { Component, OnInit } from '@angular/core';

import { NgdsDataGridOption, NgdsDataSource, NgdsModel, NgdsDataGridModel, NgdsPanelOption } from '../../../../../lib/index';
import { DatagridPropertyPipe, DatagridPropertyBadgePipe } from '../../shared/pipe/index';

class DemoDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsDataGridModel> {
        return new Promise<NgdsDataGridModel>((resolve, reject) => {
            let date = new Date();
            resolve({
                page: {
                    pageSize: 10,
                    pageCount: 10,
                    totalCount: 10,
                },
                data: [
                    {
                        username: date.toISOString(),
                        name: "胡立波",
                        mobile: "13333333333",
                        authStatus: 1,
                        compName: "浙江电商网络"
                    },
                    { username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 0, compName: "浙江电商网络" },
                    { username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1, compName: "浙江电商网络" },
                    { username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1, compName: "浙江电商网络" },
                    { username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 0, compName: "浙江电商网络" },
                    { username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1, compName: "浙江电商网络" },
                    { username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1, compName: "浙江电商网络" },
                    { username: "13999", name: "胡立波", mobile: "13333333333", authStatus: 1, compName: "浙江电商网络" },
                ]
            });
        });
    }
}
class AuthStatusDataSource implements NgdsDataSource {
    getData(params: any): Promise<NgdsModel> {
        return new Promise<NgdsModel>((resolve, reject) => {
            resolve([
                { label: "全部", value: 0 },
                { label: "已认证", value: 1 },
                { label: "未认证", value: 2 }
            ]);
        });
    }
}

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    templateUrl: 'panel.component.html',
    styleUrls: ['panel.component.scss'],
})
export class PanelComponent implements OnInit {

    constructor() {
    }

    panelOption: NgdsPanelOption = {
        crumbs: [
            {
                text: "专题资讯"
            },
            {
                text: "新增资讯"
            }
        ],
        buttons: [
            {
                text: '同步公告页数',
                action: (item) => {
                }
            },
            {
                text: '同步公告图片',
                action: (item) => {
                }
            }
        ]
    }

    option: NgdsDataGridOption = {
        dataSource: new DemoDataSource(),
        table: {
            columns: [
                { text: '用户名', property: "username"},
                { text: '姓名', property: "name"},
                { text: '手机号', property: "mobile"},
                { text: '认证状态', property: "authStatus" },
                { text: '企业名称', property: "compName", title: true, overflow: true },
            ],
            op: {
                buttons: [
                    {
                        text: '修改',
                        action: function (item) {
                            alert(item);
                        }
                    },
                    {
                        text: '删除',
                        action: function (item) {
                            alert(item);
                        }
                    }
                ],
                groupButtons: [
                    {
                        text: '用户管理',
                        buttons: [
                            {
                                text: "老师管理",
                                action: function (item) {
                                }
                            },
                            {
                                text: "学生管理",
                                action: function (item) {
                                }
                            },
                            {
                                text: "家长管理",
                                action: function (item) {
                                }
                            },
                            {
                                text: "园务管理",
                                action: function (item) {
                                }
                            }
                        ]
                    }
                ]
            }

        }
    }

    /**
     * Get the names OnInit
     */
    ngOnInit() {
    }


}
