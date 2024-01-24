import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InterfaceProduct, ValueProduct } from '../interfaces/products.interface';
import { Message } from 'src/app/shared/interfaces/mesage.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  //API
  private baseUrl = `https://fakestoreapi.com`;
  constructor(
    private http: HttpClient,
  ) { }
  //Obtener listado de productos
  getListProducts():Observable<InterfaceProduct[]>{
    return this.http.get<InterfaceProduct[]>(`${this.baseUrl}/products`);
  }
  //Obtener producto por Id
  getIdProduct(idproduct:number):Observable<InterfaceProduct>{
    return this.http.get<InterfaceProduct>(`${this.baseUrl}/products/${idproduct}`);
  }
  //Insertar producto
  postProduct(product:ValueProduct):Observable<Message>{
    return this.http.post<Message>(`${this.baseUrl}/products`,product);
  }
  //Actualizar producto por id
  putProduct(idproduct:number, product:ValueProduct):Observable<Message>{
    return this.http.put<Message>(`${this.baseUrl}/products/${idproduct}`,product);
  }
  //Eliminar producto por id
  deleteProduct(idproduct:number):Observable<Message>{
    return this.http.delete<Message>(`${this.baseUrl}/products/${idproduct}`)
  }
}
