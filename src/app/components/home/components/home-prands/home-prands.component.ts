import { Component } from '@angular/core';

@Component({
  selector: 'app-home-prands',
  standalone: true,
  imports: [],
  templateUrl: './home-prands.component.html',
  styleUrl: './home-prands.component.css'
})
export class HomePrandsComponent {
  paused = false;
  brands = [
    { name: 'ASUS', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/ASUS_Logo.svg' },
    { name: 'MSI', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/29/Msi_Logo.svg' },
    { name: 'Gigabyte', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0b/Gigabyte_Technology_logo.svg' },
    { name: 'Corsair', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/3/35/Corsair_Logo.svg' },
    { name: 'NVIDIA', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/21/Nvidia_logo.svg' },
    { name: 'AMD', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/AMD_Logo.svg' },
    { name: 'Intel', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg' },
    { name: 'Cooler Master', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/ef/Cooler_Master_logo.svg' },
    { name: 'NZXT', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/NZXT_logo.svg' },
    { name: 'EVGA', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0a/EVGA_logo.svg' }
  ];
}
