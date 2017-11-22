import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataGridComponent, PanelComponent, FormComponent,TabComponent,BlockComponent } from './ngds/index';

@NgModule({
  imports: [
    RouterModule.forRoot([
		  { path: '', component: DataGridComponent },
		  { path: 'panel', component: PanelComponent },
		  { path: 'form', component: FormComponent },
		  { path: 'tab', component: TabComponent },
		  { path: 'block', component: BlockComponent },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

