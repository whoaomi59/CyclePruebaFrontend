import { Component, Input } from '@angular/core';
import { InterfaceProduct } from '../../interfaces/products.interface';

@Component({
  selector: 'product-info-product',
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.scss']
})
export class InfoProductComponent {
  @Input() Product?:InterfaceProduct;
  //Si la imagen no se logra cargar correctamente
  handleImageError(event: any){
    event.target.src = '../../../../assets/product_default.jpg'
  }
}
