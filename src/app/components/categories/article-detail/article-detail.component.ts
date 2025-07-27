import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticleService, Article } from '../../../Services/article.service';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent implements OnInit {
  article: Article | undefined;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadArticle(slug);
    }
  }

  loadArticle(slug: string): void {
    this.loading = true;
    this.error = '';

    this.articleService.getArticleBySlug(slug).subscribe({
      next: (response) => {
        if (response.success) {
          this.article = response.data;
        } else {
          this.error = response.message || 'Article not found';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading article:', err);
        this.error = 'Failed to load article. Please try again later.';
        this.loading = false;
      }
    });
  }
}
