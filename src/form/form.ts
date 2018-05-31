import {
    Component,
    AfterContentChecked,
    ViewContainerRef,
    ViewChild,
    Output,
    ComponentFactoryResolver,
    ComponentRef,
    ComponentFactory,
    EventEmitter,
    Input
} from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgdsFormConfig, NgdsFormOption, NgdsFormCompOption } from './form.config';
import { NgdsFormRow } from './row.component';
import { NgdsFormSearchBar } from './search-bar.component';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngds-form',
    template: `
        <div class="ngds-form">
            <form nz-form [formGroup]="myForm" [ngClass]="{'search-bar':_option.showSearch}">
                <div #formRef></div>
            </form>
        </div>
    `
})
export class NgdsForm implements AfterContentChecked {
    constructor(private cfr: ComponentFactoryResolver,
        private fb: FormBuilder) {
    }

    @ViewChild("formRef", { read: ViewContainerRef }) formRef: ViewContainerRef;
    _option: NgdsFormOption;
    @Input() set option(o: NgdsFormOption) {
        this._option = o;
        this.refresh();
    }
    @Output() onSearch: EventEmitter<any> = new EventEmitter();

    myForm: FormGroup;
    compMap: any = {};
    ngOnInit() {
    }

    refresh() {
        this.formRef.clear();
        this.myForm = this.fb.group({});
        let maxCol: number = this._option.column || 0;
        this._option.labelSpan = this._option.labelSpan || 6;
        this._option.compSpan = this._option.compSpan || 18;
        if (!maxCol) {
            for (let rowCompOption of this._option.components) {
                maxCol = rowCompOption.length > maxCol ? rowCompOption.length : maxCol;
            }
        }

        let rowComp: ComponentRef<any>;
        for (let rowCompOption of this._option.components) {
            let rowFactory: ComponentFactory<any> = this.cfr.resolveComponentFactory(NgdsFormRow);
            rowComp = this.formRef.createComponent(rowFactory);
            rowComp.instance.gutter = this._option.gutter;

            for (let compOption of rowCompOption) {
                let compFactory: ComponentFactory<any> = this.cfr.resolveComponentFactory(compOption.comp);
                let comp: ComponentRef<any> = rowComp.instance.addCol(compFactory);
                if (!compOption.span) {
                    compOption.span = ~~24 / maxCol;
                }
                compOption.labelSpan = compOption.labelSpan || this._option.labelSpan;
                compOption.compSpan = compOption.compSpan || this._option.compSpan;
                compOption.formGroup = this.myForm;
                comp.instance.option = compOption;
                this.compMap[compOption.property] = comp;


                if (compOption.validations) {
                    let fnArray = [];
                    for (let validation of compOption.validations) {
                        fnArray.push(validation.fn);
                    }
                    this.myForm.addControl(compOption.property, new FormControl(compOption.value, Validators.compose(fnArray)));
                } else {
                    if (compOption.property2) {
                        this.myForm.addControl(compOption.property, new FormControl(compOption.value ? compOption.value.first : null));
                        this.myForm.addControl(compOption.property2, new FormControl(compOption.value ? compOption.value.second : null));
                    } else {
                        this.myForm.addControl(compOption.property, new FormControl(compOption.value));
                    }
                }
                if (this._option.value) {
                    compOption.value = this._option.value[compOption.property];
                }
                compOption.formOption = this._option;
            }
        }
        if (this._option.showSearch) {
            let nzOffset: number = 0;

            let lastCompSize: number = this._option.components[this._option.components.length - 1].length;
            let everyColSize: number = ~~24 / maxCol;
            let lastSpan: number;
            if (lastCompSize < 3) {
                if (this._option.components.length != 1) {
                    nzOffset = (2 - lastCompSize) * everyColSize;
                }
                if (lastCompSize == 1) {
                    lastSpan = this._option.components[this._option.components.length - 1][0].span;
                }
            } else {
                nzOffset = (2) * everyColSize;
                let rowFactory: ComponentFactory<any> = this.cfr.resolveComponentFactory(NgdsFormRow);
                rowComp = this.formRef.createComponent(rowFactory);
                rowComp.instance.gutter = this._option.gutter;
            }

            let searchFactory: ComponentFactory<any> = this.cfr.resolveComponentFactory(NgdsFormSearchBar);
            let comp: ComponentRef<any> = rowComp.instance.addCol(searchFactory);
            let searchOption: any =  {
                span: lastSpan ? (24 - lastSpan) : ~~24 / maxCol,
                labelSpan: this._option.labelSpan,
                compSpan: this._option.compSpan,
                formComp: this,
                offset: lastSpan?0:nzOffset
            };
            Object.assign(searchOption,this._option.search);
            comp.instance.option = searchOption;
        }
    }

    checkVal(): boolean {
        return this.myForm.valid;
    }

    getValue(): any {
        if (!this._option.value) {
            this._option.value = {};
        }
        for (let rowComp of this._option.components) {
            for (let compOption of rowComp) {
                if (compOption.hidden) {
                    delete this._option.value[compOption.property];
                } else {
                    let propertyArray: Array<string> = compOption.property.split(".");
                    let value = this._option.value;
                    propertyArray.forEach((item: string, index: number) => {
                        if (index == propertyArray.length - 1) {
                            let txComp: any = this.compMap[compOption.property].instance;
                            txComp.setCompValue(value, item, compOption.value);
                        } else {
                            if (!value[item]) {
                                value[item] = {};
                            }
                            value = value[item];
                        }
                    })
                    // this._option.value[compOption.property] = compOption.value;                    
                }
            }
        }
        return this._option.value;
    }

    getModelValue(property: string, data: any): any {
        let propertyArray: Array<string> = property.split(".");
        let value = data;
        for (let p of propertyArray) {
            if (!value) {
                value = "";
                break;
            }
            value = value[p];
        }
        return value;
    }

    setValue(data: any) {
        this._option.value = data;
        for (let rowComp of this._option.components) {
            for (let compOption of rowComp) {
                let value: any = this.getModelValue(compOption.property, data);
                if (compOption.property2) {
                    let secondValue: any = this.getModelValue(compOption.property2, data);
                    value = {
                        first: value,
                        second: secondValue
                    }
                }
                let txComp: any = this.compMap[compOption.property].instance;
                if (txComp.onChange) {
                    txComp.onChange(value == undefined ? null : value);
                }
            }
        }
    }

    getComp(property: string) {
        return this.compMap[property];
    }

    ngAfterContentChecked() {
    }

}
