//estructura de datos Original
export interface InterfaceProduct {
    id:          number;
    title:       string;
    price:       number;
    description: string;
    category:    string;
    image:       string;
}
//Interfaz a enviar por endpoint
export interface ValueProduct{
    title:       string;
    price:       string;
    description: string;
    category:    string;
    image:       string;
}
