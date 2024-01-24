import { Component } from '@angular/core';

@Component({
  selector: 'shared-infouser',
  templateUrl: './infouser.component.html',
  styleUrls: ['./infouser.component.scss']
})
export class InfouserComponent{
  //Redirecciones
  RedWath(){
    window.location.href = 'https://api.whatsapp.com/send?phone=573212907477';
  }
  RedLink(){
    window.location.href = 'https://www.linkedin.com/in/jhon-mario-chilito-calderon-b3b41b20a';
  }
}
