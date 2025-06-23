import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./authentication/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./authentication/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./authentication/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
  },
  {
    path: 'upcomming-books',
    loadChildren: () => import('./features-books/features-books.module').then(m => m.FeaturesBooksModule),
  },

  {
    path: 'book/:id',
    loadChildren: () => import('./book-details/book-details.module').then(m => m.BookDetailsModule),
  },
  {
    path: 'header',
    loadChildren: () => import('./components/header/header.module').then(m => m.HeaderModule),
  },
  {
    path: 'footer',
    loadChildren: () => import('./components/footer/footer.module').then(m => m.FooterModule),
  },
  {
    path: 'admin-profile',
    loadChildren: () => import('../app/admin-profile/admin-profile.module').then(m => m.AdminProfileModule),
  },
  {
    path: 'user-history',
    loadChildren: () => import('../app/user-details/user-details.module').then(m => m.UserDetailsModule),
  },
  {
    path: 'add-books',
    loadChildren: () => import('../app/admin-addbook/admin-addbook.module').then(m => m.AdminAddbookModule),
  },
  {
    path: 'edit-books/:id',
    loadChildren: () => import('../app/admin-addbook/admin-addbook.module').then(m => m.AdminAddbookModule),
  },
  {
    path: 'order-books',
    loadChildren: () => import('../app/order-books/order-books.module').then(m => m.OrderBooksModule),
  },
  {
    path: 'user-profile',
    loadChildren: () => import('../app/components/user-profile/user-profile.module').then(m => m.UserProfileModule),
  },
  {
    path: 'own-book',
    loadChildren: () => import('../app/own-book/own-book.module').then(m => m.OwnBookModule),
  },
  {
    path: 'list-books',
    loadChildren: () => import('../app/admin-history/admin-history.module').then(m => m.AdminHistoryModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
