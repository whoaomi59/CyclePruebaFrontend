import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { InterfaceProduct } from '../../interfaces/products.interface';
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { ProductsService } from '../../services/products.service';
import { FormProductComponent } from '../form-product/form-product.component';

@Component({
  selector: 'product-target-product',
  templateUrl: './target-product.component.html',
  styleUrls: ['./target-product.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class TargetProductComponent {
  @ViewChild(FormProductComponent, {static:false})
  viewFormProductsComponent: FormProductComponent | undefined;
  @Input() product?:InterfaceProduct;
  @Output() IdProductDelete = new EventEmitter<number>();
  public productInfo!: InterfaceProduct;
  ProductPut:boolean = false;
  ProductInfo:boolean = false;
  loading:boolean = false;
  TitleProductPut= 'Actualizar Producto';
  ProductId!:number;
  Mode:string = 'PUT';

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private productService: ProductsService
    ){}
  viewInfoProduct(idproduct:number){
    this.loading = true;
    setTimeout(()=>{
      this.productService.getIdProduct(idproduct).subscribe(resp=>{
        if(!resp) return;
        this.productInfo = resp;
      })
    },200);
    setTimeout(() =>{
      this.loading = false;
      this.ProductInfo = true;
    },800);
  };
  putProduct(idproduct:number){
    this.ProductId = idproduct;
    this.loading = true;
    setTimeout(()=>{
      if(this.viewFormProductsComponent){
        this.viewFormProductsComponent.getInfoProduct();
      }
    },200);
    setTimeout(() =>{
      this.loading = false;
      this.ProductPut = true;
    },800);
  }
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
        this.IdProductDelete.emit(idproduct);
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
}
