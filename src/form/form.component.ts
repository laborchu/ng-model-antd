import {
    HostBinding
} from '@angular/core';

export abstract class NgdsFormComp{
  constructor() {

  }

  abstract onChange(value:any):any;


  setCompValue(formValue:any,compKey:string,compValue:any):void{
    formValue[compKey] = compValue;
  }

  @HostBinding('hidden')
  isHidden:boolean = false;

}