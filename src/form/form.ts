import {
    Component,
    AfterContentChecked,
    ViewContainerRef,
    ViewChild,
    ComponentFactoryResolver,
    ComponentRef,
    ComponentFactory,
    Input
} from '@angular/core';
import {FormGroup, FormControl, FormBuilder,Validators} from '@angular/forms';
import {NgdsFormConfig, NgdsFormOption} from './form.config';
import {NgdsFormRow} from './row.component';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngds-form',
    template: `
        <div class="ngds-form">
            <form nz-form [formGroup]="myForm">
                <div #formRef></div>
            </form>
        </div>
    `
})
export class NgdsForm implements AfterContentChecked {
    constructor(config: NgdsFormConfig,
                private cfr: ComponentFactoryResolver,
                private fb: FormBuilder) {
    }

    @ViewChild("formRef", {read: ViewContainerRef}) formRef: ViewContainerRef;
    @Input() option: NgdsFormOption;
    myForm: FormGroup;
    compMap: any = {};
    ngOnInit() {
        this.myForm = this.fb.group({});
        let maxCol:number = 0;
        for (let rowCompOption of this.option.components) {
            maxCol = rowCompOption.length>maxCol?rowCompOption.length:maxCol;
        }
        for (let rowCompOption of this.option.components) {
            
            let rowFactory: ComponentFactory<any> = this.cfr.resolveComponentFactory(NgdsFormRow);
            let rowComp: ComponentRef<any> = this.formRef.createComponent(rowFactory);
            rowComp.instance.gutter = maxCol*8+16;
            
            for (let compOption of rowCompOption) {
                let compFactory: ComponentFactory<any> = this.cfr.resolveComponentFactory(compOption.comp);
                let comp: ComponentRef<any> = rowComp.instance.addCol(compFactory);
                if(!compOption.span){
                    compOption.span = ~~24/maxCol;
                }
                compOption.formGroup = this.myForm;
                comp.instance.option = compOption;
                this.compMap[compOption.property] = comp;
                if(compOption.validations){
                    let fnArray = [];
                    for(let validation of compOption.validations){
                        fnArray.push(validation.fn);
                    }
                    this.myForm.addControl(compOption.property,new FormControl(compOption.value,Validators.compose(fnArray)));
                }else{
                    this.myForm.addControl(compOption.property,new FormControl(compOption.value));
                }
                if(this.option.value){
                    compOption.value = this.option.value[compOption.property];
                }
            }
            
        }

    }

    checkVal():boolean{
        return this.myForm.valid;
    }

    getValue(): any {
        if(!this.option.value){
            this.option.value = {};
        }
        for (let rowComp of this.option.components) {
            for (let compOption of rowComp) {
                this.option.value[compOption.property] = compOption.value;
            }
        }
        return this.option.value;
    }

    setValue(data:any){
        this.option.value = data;
        for (let rowComp of this.option.components) {
            for (let compOption of rowComp) {
                compOption.value = this.option.value[compOption.property];
                let txComp: any = this.compMap[compOption.property].instance;
                if (txComp.onChange){
                    txComp.onChange();
                }
            }
        }
    }

    getComp(property:string){
        return this.compMap[property];
    }

    ngAfterContentChecked() {
    }

}
