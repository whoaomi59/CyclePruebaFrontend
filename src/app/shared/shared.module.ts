import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { TopbarComponent } from './components/topbar/topbar.component';
import { InfouserComponent } from './components/infouser/infouser.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    TopbarComponent,
    InfouserComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule
  ],
  exports:[
    TopbarComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
