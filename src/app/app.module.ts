import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {MatInputModule, MatButtonModule,  MatAutocompleteModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,MatIconRegistry} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

import { HeaderComponent } from './nav/header/header.component';
import { ScriptsComponent } from './pages/scripts/scripts.component';
import { ScriptsListComponent } from './pages/scripts/scripts-list/scripts-list.component';
import { ScriptsDetailComponent } from './pages/scripts/scripts-detail/scripts-detail.component';
import { GreatsListComponent } from './pages/greats-list/greats-list.component';
import { GreatsEditComponent } from './pages/greats-list/greats-edit/greats-edit.component';
import { ScriptEditComponent } from './pages/scripts/script-edit/script-edit.component';
import { SidenavComponent} from './nav/sidenav/sidenav.component';
import { UserComponent } from './user/user.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { ScriptNewComponent } from './pages/scripts/script-new/script-new.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';

import {ScriptService} from './pages/scripts/script.service';
import {GreatsListService} from './pages/greats-list/greats-list.service';
import {UserService} from './user/user.service';
import {AuthService} from './auth/auth.service';
import {TokenService} from './auth/token.service';
import {ServerService} from './auth/server.service';

import { HighlightDirective} from './shared/highlight.directive';
import { OpeningComponent } from './pages/explore/opening/opening.component';
import { TrendingComponent } from './pages/explore/trending/trending.component';
import { VerifyComponent } from './auth/verify/verify.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScriptsComponent,
    ScriptsListComponent,
    ScriptsDetailComponent,
    GreatsListComponent,
    GreatsEditComponent,
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
    VerifyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule, MatButtonModule,MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    FormsModule, AppRoutingModule,ReactiveFormsModule,
    CdkTableModule,
    HttpClientModule
  ],
  providers: [GreatsListService,TokenService,
     ScriptService, UserService, AuthService, ServerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }

 }
