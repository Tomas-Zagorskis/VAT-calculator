import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products = [
    {
      id: 'p1',
      name: 'Product 1',
      price: 100,
      description: "It's a really good product.",
      quantity: 0,
    },
    {
      id: 'p2',
      name: 'Product 2',
      price: 75,
      description: 'One of the best.',
      quantity: 0,
    },
    {
      id: 'p3',
      name: 'Product 3',
      price: 120,
      description: "It's description of the product.",
      quantity: 0,
    },
  ];
}
