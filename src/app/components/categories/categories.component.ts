import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { CategoryService } from '../../Services/category.service';
import { ICategory } from '../../Interfaces/icategory';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
categories : any

  constructor(private router: Router, private _category: CategoryService) {}

ngOnInit(): void {
  this.getAllCateories()
}

  getAllCateories(){
    this._category.getAllCategories().subscribe({
      next: (res) =>{
        console.log(res);
        this.categories = res.data
      },
      error: (err) =>{
        console.log(err);
        
      }
    })
  }

  navigateToCategory(id: string) {
    this.router.navigate(['/category-details', id]);
  }

  trackById(index: number, item: ICategory) {
    return item.id;
  }
}
