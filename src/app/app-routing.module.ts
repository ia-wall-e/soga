import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./features/public/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'nuevo-producto/:id',
    loadChildren: () => import('./features/private/products/new-product/new-product.module').then( m => m.NewProductPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./features/private/categories/page/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./features/private/products/products.module').then( m => m.ProductsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
