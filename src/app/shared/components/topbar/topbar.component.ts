import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'shared-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit  {

  ItemsMenu: MenuItem[] = [];
  UserInfo:boolean = false;

  showUser(){
    this.UserInfo = true;
  }
  ngOnInit(): void {
    //componentes de menu
    this.ItemsMenu = [
      {
        label: 'Lista de Productos',
        icon: 'pi pi-list'

      }
    ]
  }
}
