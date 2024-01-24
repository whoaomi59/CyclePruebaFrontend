import { Component, OnDestroy, OnInit } from '@angular/core';
import { InterfaceProduct } from '../../interfaces/products.interface';
import { ProductsService } from '../../services/products.service';
import { MessageService } from 'primeng/api';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'products-card-products',
  templateUrl: './card-products.component.html',
  styleUrls: ['./card-products.component.scss'],
  providers: [MessageService]
})
export class CardProductsComponent implements OnInit, OnDestroy {
  public products:InterfaceProduct[] = [];
  loading:boolean = false;
  private _destroSuscriptions$ = new Subject<void>();
  constructor(
    private productService: ProductsService,
    private messageService: MessageService,
    private loadinService: LoadingService
  ){}
  //Manejar Desuscripciones
  ngOnDestroy(): void {
    this._destroSuscriptions$.next();
    this._destroSuscriptions$.complete();
  }
  //Inicializar al cargar
  ngOnInit(): void {
    this.loadinService.spinnerObserver.pipe(takeUntil(this._destroSuscriptions$)).subscribe((show: boolean)=>{
      this.loading = show;
    });
    this.getProducts();
  }
  //Eliminar Producto
  deleteProduct(resp: number){
    this.messageService.add({ severity: 'success', detail: 'Se elimino Exitosamente'});
    this.products = this.products.filter(product => product.id !== resp)
  }
  //Obtener todos los productos
  getProducts(){
    //Cargar Spineer
    this.loadinService.toggleSpinner(true);
    //Consumir Servicio
    this.productService.getListProducts().pipe(takeUntil(this._destroSuscriptions$)).subscribe({
      //Si se completa la función
      next:(resp:InterfaceProduct[])=>{
        this.products = resp;
        this.loadinService.toggleSpinner(false)
      },
      //Si ocurre un Error
      error:()=>{
        this.messageService.add({ severity: 'error', detail: 'No se Logro Cargar los Productos'});
      }
    })
  }

}
