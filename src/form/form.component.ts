import {
    HostBinding
} from '@angular/core';

export class NgdsFormComp{
  constructor() {

  }

  @HostBinding('hidden')
  isHidden:boolean = false;

}