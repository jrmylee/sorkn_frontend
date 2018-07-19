import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FileUploadModule } from '@ng-forms/file-upload';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MatInputModule, MatButtonModule,  MatAutocompleteModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatIconRegistry} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChangeDetectorRef } from '@angular/core';
import { environment } from '../environments/environment';

import { HeaderComponent, LoginDialog } from './nav/header/header.component';
import { ScriptsComponent } from './pages/scripts/scripts.component';
import { ScriptsListComponent } from './pages/scripts/scripts-list/scripts-list.component';
import { ScriptsDetailComponent } from './pages/scripts/scripts-detail/scripts-detail.component';
import { GreatsListComponent } from './pages/lists/film-list.component';
import { ScriptEditComponent } from './pages/scripts/script-edit/script-edit.component';
import { SidenavComponent} from './nav/sidenav/sidenav.component';
import { UserComponent } from './user/user.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { ScriptNewComponent, ScriptComponent } from './pages/scripts/script-new/script-new.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { OpeningComponent } from './pages/explore/opening/opening.component';
import { TrendingComponent } from './pages/explore/trending/trending.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { InspirationComponent, GetStartedDialog } from './pages/explore/inspiration/inspiration.component';
import { FilmdetailComponent } from './pages/films/filmdetail/filmdetail.component';
import { AboutComponent } from './pages/about/about.component';
import { FilmsComponent } from './pages/films/films/films.component';
import { SearchComponent } from './pages/search/search.component';
import { ListdetailComponent, DeleteDialog } from './pages/lists/listdetail/listdetail.component';
import { NewlistComponent } from './pages/lists/newlist/newlist.component';

import {ScriptService} from './pages/scripts/script.service';
import {FilmListService} from './pages/lists/film-list.service';
import {UserService} from './user/user.service';
import {AuthService} from './auth/auth.service';
import {TokenService} from './auth/token.service';
import {ServerService} from './auth/server.service';
import {NavService} from './nav/nav.service';
import {SearchService} from './nav/header/search.service';

import { HighlightDirective} from './models/highlight.directive';
import { EditlistComponent } from './pages/lists/editlist/editlist.component';
import { ExternalNavService } from './nav/nav.external.service';
import { FilmService } from './pages/films/film.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScriptsComponent,
    ScriptsListComponent,
    ScriptsDetailComponent,
    GreatsListComponent,
    ScriptEditComponent,
    SidenavComponent,
    HighlightDirective,
    UserComponent,
    ExploreComponent,
    ScriptNewComponent,
    RegisterComponent,
    LoginComponent,
    OpeningComponent,
    TrendingComponent,
    VerifyComponent,
    InspirationComponent,
    FilmdetailComponent,
    AboutComponent,
    FilmsComponent,
    SearchComponent,
    ListdetailComponent,
    NewlistComponent,
    ScriptComponent,
    EditlistComponent,
    DeleteDialog,
    GetStartedDialog,
    LoginDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule, MatButtonModule,MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    FormsModule, AppRoutingModule,ReactiveFormsModule,
    CdkTableModule,
    HttpClientModule,    
    FlexLayoutModule,
    FileUploadModule
  ],
  providers: [FilmListService,TokenService,
     ScriptService, UserService, AuthService, ServerService, NavService, SearchService, ExternalNavService,
     FilmService
  ],
  
  entryComponents:[ScriptComponent,ScriptNewComponent, DeleteDialog,GetStartedDialog, LoginDialog],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }

 }
