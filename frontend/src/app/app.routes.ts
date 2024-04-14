import { Routes } from '@angular/router';
import { rentedCarResolver } from './rented-cars/rented-cars.resolver';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/list',
        pathMatch: 'full'
    },
    {path: 'list', loadComponent: () => import('./rented-cars/list/list.component').then(
        mod => mod.ListComponent
    )},

    {path: 'form', loadComponent: () => import('./rented-cars/form/form.component')
        .then( mod => mod.FormComponent), outlet: 'modal',
    },
    {path: 'form/:id', loadComponent: () => import('./rented-cars/form/form.component')
        .then( mod => mod.FormComponent), outlet: 'modal', resolve: {data: rentedCarResolver}
    },
];
