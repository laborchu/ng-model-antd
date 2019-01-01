import { Component, ViewChild, TemplateRef } from '@angular/core';
import './operators';

/**
 * This class represents the main application component.
 */
@Component({
  selector: 'app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
  }
  @ViewChild('trigger') customTrigger: TemplateRef<void>;

  isCollapsed = false;

  triggerTemplate:TemplateRef<void> = null;
  changeTrigger(): void {
    this.triggerTemplate = this.customTrigger;
  }
}
