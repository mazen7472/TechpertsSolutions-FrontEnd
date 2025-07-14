import { Component } from '@angular/core';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  customers = [
    {
      name: 'Aya ElMasry',
      email: 'aya@example.com',
      phone: '+20 123 456 7890',
      active: true
    },
    {
      name: 'Omar Soliman',
      email: 'omar@example.com',
      phone: '+20 987 654 3210',
      active: false
    },
    {
      name: 'Mona Khaled',
      email: 'mona@example.com',
      phone: '+20 111 222 3333',
      active: true
    },
    {
      name: 'Marawan Gomaa',
      email: 'maeawangomaa70@gmail.com',
      phone: '01273919184',
      active: true
    }
  ];
}
