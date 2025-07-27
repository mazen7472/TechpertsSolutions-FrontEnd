import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';
import { ArticleService, Article } from '../../Services/article.service';

interface Category {
  title: string;
  description: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterLink], 
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  searchQuery = '';
  showSubscription = true;
  loading = false;
  error = '';

  featuredArticles: Article[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadFeaturedArticles();
  }

  loadFeaturedArticles(): void {
    this.loading = true;
    this.error = '';
    
    this.articleService.getFeaturedArticles().subscribe({
      next: (response) => {
        if (response.success) {
          this.featuredArticles = response.data;
        } else {
          this.error = response.message || 'Failed to load articles';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading articles:', err);
        this.error = 'Failed to load articles. Please try again later.';
        this.loading = false;
      }
    });
  }

 categories = [
    { label: 'SERVICES', imageUrl: '../../../../../assets/Images/Categories/customer-service-1.png' },
    { label: 'Processors ', imageUrl: '../../../../../assets/Images/Categories/processors.png' },
    { label: 'Mother Boards', imageUrl: '../../../../../assets/Images/Categories/motherboard.png' },
    { label: 'Graphics Cards', imageUrl: '../../../../../assets/Images/Categories/video-card.png' },
    { label: 'LapTop', imageUrl: '../../../../../assets/Images/Categories/laptop.png' },
    { label: 'Ram', imageUrl: '../../../../../assets/Images/Categories/ram.png' }
  ];

  tags: string[] = ['GPU', 'Budget', 'Maintenance', 'Build Guide', 'Performance'];

  get filteredArticles() {
    return this.featuredArticles.filter(article =>
      article.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  trackByTitle(index: number, item: { title: string }) {
    return item.title;
  }
}
