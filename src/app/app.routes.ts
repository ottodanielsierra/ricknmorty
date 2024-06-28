import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Rick&Morty Characters!',
        data: { animation: 'HomePage' }
    },
    {
        path: 'character/:id',
        component: DetailComponent,
        title: 'Character Detail | Rick&Morty',
        data: { animation: 'DetailPage' },
    },
];
