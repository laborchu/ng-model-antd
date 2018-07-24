import {
  HostBinding
} from '@angular/core';

export abstract class NgdsFormComp {
  constructor() {

  }

  abstract setValue(value: any): void;

  abstract onChange(): void;


  setCompValue(formValue: any, compKey: string, compValue: any): void {
    formValue[compKey] = compValue;
  }

  @HostBinding('hidden')
  isHidden: boolean = false;

}