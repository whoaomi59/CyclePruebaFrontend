import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { InterfaceProduct } from '../../interfaces/products.interface';
import { ProductsService } from '../../services/products.service';
import { FormProductComponent } from '../../components/form-product/form-product.component';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'products-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class ListProductsComponent implements OnInit, OnDestroy {
  //Obtner control del Componente Hijo
  @ViewChild(FormProductComponent, {static:false})
  viewFormProductsComponent: FormProductComponent | undefined;
  TitleProductPut = 'Actualizar Producto'
  ProductPut:boolean = false;
  ProductInfo:boolean = false;
  loading:boolean = false;
  Mode:string = 'PUT';
  ProductId!:number;
  public products: InterfaceProduct[] = [];
  public product!: InterfaceProduct;
  private _destroSuscriptions$ = new Subject<void>();
  constructor(
    private productService: ProductsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private loadinService: LoadingService
  ){}
  ngOnDestroy(): void {
    this._destroSuscriptions$.next();
    this._destroSuscriptions$.complete();
  }
  ngOnInit(): void {
    this.loadinService.spinnerObserver.pipe(takeUntil(this._destroSuscriptions$)).subscribe((show: boolean)=>{
      this.loading = show;
    });
    this.getListProducts();
    this.ProductId = 0;
  }
  //Obtner listado de productos
  getListProducts(){
    this.loadinService.toggleSpinner(true);
    this.productService.getListProducts().pipe(takeUntil(this._destroSuscriptions$)).subscribe({
      next:(resp: InterfaceProduct[])=>{
        this.products = resp;
        this.loadinService.toggleSpinner(false);
      },
      error:()=>{
        this.messageService.add({ severity: 'error', detail: 'No se Logro Cargar los Productos'});
      }
    })
  }
  //Mostrar Información del Producto
  viewInfoProduct(idproduct:number){
    this.loadinService.toggleSpinner(true);
    setTimeout(()=>{
      this.productService.getIdProduct(idproduct).subscribe(resp=>{
        if(!resp) return;
        this.product = resp;
      })
    },200);
    setTimeout(() =>{
      this.loadinService.toggleSpinner(false);
      this.ProductInfo = true;
    },800);
  }
  //Actualizar Productos
  putProduct(idproduct:number){
    this.ProductId = idproduct;
    this.loadinService.toggleSpinner(true);
    setTimeout(()=>{
      if(this.viewFormProductsComponent){
        this.viewFormProductsComponent.getInfoProduct();
      }
    },200)
    setTimeout(() =>{
      this.loadinService.toggleSpinner(false);
      this.ProductPut = true;
    },800)
  }
  //Eliminar Productos
  deleteProduct(idproduct:number){
    this.confirmationService.confirm({
      header: '¿Desea Eliminar este Producto?',
      message:'Una vez se elimine el producto no se podra recuperar la información de este',
      icon: 'pi pi-exclamation-triangle',
      accept:()=>{
        //Servicio Desactivado 
        /* this.productService.deleteProduct(idproduct).subscribe(resp =>{
          this.messageService.add({
            severity: resp.severity,
            detail: resp.detail,
            summary: resp.summary,
          });
          if(resp.status === 202){
            this.getListProducts();
          }
        }); */
        this.messageService.add({ severity: 'success', detail: 'Se elimino Exitosamente'});
        this.products = this.products.filter(product => product.id !== idproduct)
      },
      reject: (type: ConfirmEventType)=>{
        switch(type){
          case ConfirmEventType.REJECT:
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Se Cancelo la Acción' });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({ severity: 'warn', summary: 'Cancelado', detail: 'Se Cancelo la Acción' });
            break;
        }
      }
    })
  }
  dataUpdate(data:InterfaceProduct){
    //Agregar cambios al producto por id del arreglo
    const indice = this.products.findIndex(product => product.id === this.ProductId);
    this.products[indice] = data
  }
  //Si la imagen no se logra cargar, mostrar la siguiente
  handleImageError(event: any){
    event.target.src = '../../../../assets/product_default.jpg'
  }
}
