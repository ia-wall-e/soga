import { Component, OnInit,inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
  standalone:false
})
export class NewProductPage implements OnInit {

  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  public appPages = [
    { title: 'Inbox', url: '/nuevo-producto/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/nuevo-producto/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/nuevo-producto/favorites', icon: 'heart' },
    { title: 'Archived', url: '/nuevo-producto/archived', icon: 'archive' },
    { title: 'Trash', url: '/nuevo-producto/trash', icon: 'trash' },
    { title: 'Spam', url: '/nuevo-producto/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}
