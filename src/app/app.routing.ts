import { RouterModule, Routes,CanActivate } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddEventComponent } from './add-event/add-event.component';
import { ListEventsComponent } from './list-events/list-events.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '',  redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'list-events', component: ListEventsComponent,canActivate: [AuthGuard] },
  { path: 'add-events', component: AddEventComponent,canActivate: [AuthGuard]},
  { path: 'update-event/:id', component: UpdateEventComponent,canActivate: [AuthGuard] }
];

export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);