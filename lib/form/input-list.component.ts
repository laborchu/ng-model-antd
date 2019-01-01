import {
  Component,
  AfterContentChecked,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  Input
} from '@angular/core';
import { NgdsFormConfig, NgdsFormInputListCompOption } from './form.config';
import { NgdsFormComp } from './form.component';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'ngds-form-input',
  template: `
  <div nz-col [nzSpan]="option.span" class="input-list" *ngIf="!option.hidden">
    <div nz-form-item nz-row>
      <div nz-form-label nz-col [nzSpan]="option.labelSpan" >
        <label for="{{option.property}}">{{option.label}}</label>
      </div>
      <nz-form-control nz-col [nzSpan]="option.compSpan" [nzValidateStatus]="getFormControl(option.property)">

        <input nz-input type="{{option.type}}" [(ngModel)]="i[option.valueField]" 
        (ngModelChange)="onChange()"
        *ngFor="let i of option.value;let inputIndex = index">
          <ng-template #addOnAfter>
            <i *ngIf="inputIndex!=option.value.length-1" nz-icon type="down" theme="outline" (click)="downInput(i,inputIndex)"></i>
            <i *ngIf="inputIndex!=0" nz-icon type="up" theme="outline" (click)="upInput(i,inputIndex)"></i>
            <i nz-icon type="minus-circle" theme="outline" (click)="minusInput(i,inputIndex)"></i>
          </ng-template>

        <button nz-button [nzType]="'dashed'" style="width:100%" (click)="addInput()">
          <i nz-icon type="plus-circle" theme="outline"></i>
          <span>添加</span>
        </button>
        
      </nz-form-control>
    </div>
  </div>
  `
})
export class NgdsFormInputList extends NgdsFormComp implements AfterContentChecked {
  constructor() {
    super();
  }

  option: NgdsFormInputListCompOption;

  setValue(value: any) {
    if (value) {
      this.option.value = value;
    }
  }

  onChange() {
    this.option.onChange && this.option.onChange(this.option);
  }

  ngOnInit() {

  }

  addInput() {
    if (!this.option.value) {
      this.option.value = [];
    }
    this.option.value.push({});
  }

  downInput(data: any, index: number) {
    let from: number;
    let to: number;
    from = index;
    to = index + 1;
    this.option.value.splice(to, 0, this.option.value.splice(from, 1)[0]);
  }

  minusInput(data: any, index: number) {
    this.option.value.splice(index, 1);
  }

  upInput(data: any, index: number) {
    let from: number;
    let to: number;
    from = index - 1;
    to = index;
    this.option.value.splice(to, 0, this.option.value.splice(from, 1)[0]);
  }

  ngAfterContentChecked() {
  }

  getFormControl(name: string): any {
    return this.option.formGroup.controls[name];
  }

}
