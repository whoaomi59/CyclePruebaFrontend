import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { InterfaceProduct } from '../interfaces/products.interface';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'layout-products',
  templateUrl: './layout-products.component.html',
  styleUrls: ['./layout-products.component.scss']
})
export class LayoutProductsComponent implements OnInit{
  Mode:string = 'POST';
  ProductView:boolean = false;
  Productnew:boolean = false;
  TitleProduct = 'Registrar Producto';
  Namesidebar = 'Productos';
  product!:InterfaceProduct;
  loading:boolean = false;
  private _destroSuscriptions$ = new Subject<void>();
  constructor(
    private router: Router,
    private location: Location,
    private loadinService: LoadingService
  ){}
  ngOnInit(): void {
    this.value = this.getUrl();
    this.loadinService.spinnerObserver.pipe(takeUntil(this._destroSuscriptions$)).subscribe((show: boolean)=>{
      this.loading = show;
    });
  }
  navigationOptions: MenuItem[] = [
    {value: 'table', icon: 'pi pi-align-justify', routerLink: 'table'}, 
    {value: 'card', icon: 'pi pi-th-large', routerLink: 'card'}
  ];
  value:string = 'card'
  
  showFormProduct(){
    this.ProductView = true;
  }
  //Funcion de navegación de elementos
  redirectView(event:any){
    const selectedValue = event.value;
    if(selectedValue){
      this.router.navigate([`/products/${selectedValue}`]);
    }else{
      this.router.navigate([`/products/card`]);
      this.value = 'card'
    }
  }
  newData(data:InterfaceProduct){
    this.product = data;
    this.loadinService.toggleSpinner(true);
    setTimeout(() =>{
      this.loadinService.toggleSpinner(false);
      this.Productnew = true;
    },400)
  }
  //redirección en base al valor de la url
  getUrl():string{
    const UrlLocation =  this.location.path();
    const parts = UrlLocation.split('/');
    const endUrl = parts.filter(url => url !== '').pop();
    return endUrl || 'card'
  }
  
}
