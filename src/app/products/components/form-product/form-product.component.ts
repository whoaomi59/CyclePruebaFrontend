import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { ProductsService } from '../../services/products.service';
import { ValueProduct } from '../../interfaces/products.interface';
import { MessageService } from 'primeng/api';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'product-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
  providers: [MessageService]
})
export class FormProductComponent implements OnInit, OnDestroy{
  //funciones que se ejecutaran otras funciones en componente padre
  @Output() buttonClose:EventEmitter<any> = new EventEmitter();
  @Output() sendData:EventEmitter<any> = new EventEmitter<any>();
  @Output() newData:EventEmitter<any> = new EventEmitter<any>();
  //datos que consumira por parte de padre
  @Input() IdProduct!:number;
  @Input() Mode:string = 'POST';
  private _destroSuscriptions$ = new Subject<void>();
  loading:boolean = false;
  constructor(
    private fb: FormBuilder, 
    private messageService: MessageService,
    private productService: ProductsService,
    private loadinService: LoadingService,
    private validatorService: ValidatorsService,
  ){}
  ngOnDestroy(): void {
    this._destroSuscriptions$.next();
    this._destroSuscriptions$.complete();
  }
  ngOnInit(): void {
    this.loadinService.spinnerObserver.pipe(takeUntil(this._destroSuscriptions$)).subscribe((show: boolean)=>{
      this.loading = show;
    });
    this.IdProduct = 0;
  }
  //Creacion del formulario en base a sus Validadores
  public productForm = this.fb.group({
    title: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(75)]],
    description: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(380)]],
    category: ['',[Validators.required]],
    image: [''],
    price: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(8)]]
  })
  //Obtner el estado de validación de casilla de formulario
  isValidfield(field:string){
    return this.validatorService.isValidField(this.productForm, field);
  }
  //Mostrar posible error referente a casilla de formulario
  getErrors(field:string){
    return this.validatorService.getFieldError(this.productForm, field);
  }
  get currentProduc():ValueProduct{
    const product = this.productForm.value as ValueProduct;
    return product;
  }
  onSubmit(){
    if(this.productForm.invalid){
      this.productForm.markAllAsTouched();
      return;
    }
    this.IdProduct ? this.putProduct() : this.postProduct();
  }
  getInfoProduct(){
    this.productService.getIdProduct(this.IdProduct).subscribe(resp=>{
      if(!resp) return;
      let category = this.assigCategory(resp.category);
      //Insertar en formulario los valores a actualizar
      this.productForm.patchValue({
        title: resp.title,
        description: resp.description,
        category: category,
        image: resp.image,
        price: resp.price.toString()
      })
    })
  }
  //Obtener categoria que no coincidan con las disponiles y reasignarlass
  assigCategory(category:string){
    if (category === "women's clothing" || category === "men's clothing") {
      return 'clothing';
    }
    //Si es de tipo jewelery
    if (category === 'jewelery') {
      return 'accesories';
    }
    return category;
  }
  postProduct(){
    //Servicio Desactivado
    /* this.productService.postProduct(this.currentProduc).subscribe(resp =>{
      if(!resp) return;
      this.messageService.add({
        severity: resp.severity,
        detail: resp.detail,
        summary: resp.summary,
      });
      if(resp.status === 202){
        this.productForm.reset();
        this.buttonClose.emit();
      }
    }); */
    this.messageService.add({ severity: 'success', detail: 'Se Registro Exitosamente'});
    //enviar información a componente padre
    this.newData.emit(this.currentProduc)
    this.productForm.reset();
    setTimeout(()=>{
      //Ejecutar 
      this.buttonClose.emit();
    },500)
    
  }
  putProduct(){
    //Servicio Desactivado
    /* this.productService.putProduct(this.IdProduct,this.currentProduc).subscribe(resp=>{
      if(!resp) return;
      if(resp.status === 202){
        this.buttonClose.emit();
      }
    }); */
    this.messageService.add({ severity: 'success', detail: 'Se Actualizo Exitosamente'});
    this.sendData.emit(this.currentProduc);
    setTimeout(()=>{
      this.buttonClose.emit();
    },700)
  }
  CancelForm(){
    this.productForm.reset();
    this.buttonClose.emit();
  }
  
}
