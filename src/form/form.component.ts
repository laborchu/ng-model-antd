import {
    HostBinding
} from '@angular/core';

export abstract class NgdsFormComp{
  constructor() {

  }

  abstract onChange(value:any):any;

  @HostBinding('hidden')
  isHidden:boolean = false;

}