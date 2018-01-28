import { NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ExploreComponent} from './pages/explore/explore.component';
import {ScriptsComponent} from './pages/scripts/scripts.component';
import {GreatsListComponent} from './pages/greats-list/greats-list.component';
import {ScriptsListComponent} from './pages/scripts/scripts-list/scripts-list.component';
import {ScriptsDetailComponent} from './pages/scripts/scripts-detail/scripts-detail.component';
import {ScriptEditComponent} from './pages/scripts/script-edit/script-edit.component';
import {ScriptNewComponent} from './pages/scripts/script-new/script-new.component';
import {UserComponent} from './user/user.component';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {VerifyComponent} from './auth/verify/verify.component';
import {FilmdetailComponent} from './pages/films/filmdetail/filmdetail.component';
import {AboutComponent} from './pages/about/about.component';

import {ScriptService} from './pages/scripts/script.service';
const appRoutes: Routes = [
  { path: '', redirectTo: '/explore', pathMatch: 'full'},
  {path: 'explore', component: ExploreComponent},
  {path: 'about', component: AboutComponent},
  {path: 'scripts', component:ScriptsListComponent, children: [
    {path: ':id/edit', component: ScriptEditComponent}
  ]},
  {path: 'new', component: ScriptNewComponent},
  {path: 's/:id', component: ScriptsDetailComponent},
  {path: 'greats', component: GreatsListComponent},
  {path: 'u/:id', component: UserComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'confirmation/:URL', component: VerifyComponent},
  {path: 'f/:id', component: FilmdetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule{

}