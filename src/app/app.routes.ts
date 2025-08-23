import { SingleProjectComponent } from './pages/single-project/single-project.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'projects/:id',
        component: SingleProjectComponent
    }
];
