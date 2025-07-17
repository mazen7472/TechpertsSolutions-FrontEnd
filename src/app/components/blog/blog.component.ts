import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {

     featuredArticles = [
    { img: 'https://www.amd.com/content/dam/amd/en/images/pr-feed/1247269.png', date: 'Jan 15, 2025', title: 'RTX 4090 vs RTX 4080', description: 'Gaming benchmarks that reveal next-gen GPU power.' },
    { img: 'https://www.amd.com/content/dam/amd/en/images/pr-feed/1247269.png', date: 'Jan 12, 2025', title: 'AMD Ryzen 7000 Review', description: 'How AMD stacks up against Intel’s 13th gen chips.' },
    { img: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnJ5YXM0NHo3MGE1MXN5dWh4a3ZkZWxodGVtNGh3cjFsMzUzNGRqOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/sUvXqhA9nukbIM0MyO/giphy.gif', date: 'Jan 10, 2025', title: 'DDR5 vs DDR4', description: 'Is upgrading worth it for your setup?' }
  ];
  categories = [
    { title: 'Processors', description: 'Benchmarks and reviews'},
    { title: 'Graphics Cards', description: 'GPU comparisons' },
    { title: 'Memory', description: 'RAM performance insights' },
    { title: 'Storage', description: 'SSD vs HDD speed tests' }
  ];
}
