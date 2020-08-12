import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Módulos do Material
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Módulos de páginas e components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidemenuComponent } from './shared/components/sidemenu/sidemenu.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { HomeRightCardComponent } from './components/cards/home/home-right-card/home-right-card.component';
import { HomeLeftCardComponent } from './components/cards/home/home-left-card/home-left-card.component';
import { AboutComponent } from './pages/about/about.component';
import { AboutStandardCardComponent } from './components/cards/about/about-standard-card/about-standard-card.component'
import { IntegrantLeftCardComponent } from './components/cards/about/integrant-left-card/integrant-left-card.component';
import { IntegrantRightCardComponent } from './components/cards/about/integrant-right-card/integrant-right-card.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InputComponent } from './components/moviment/input/input.component';
import { ForgotpassComponent } from './pages/forgotpass/forgotpass.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { HistoryComponent } from './components/moviment/history/history.component';
import { ErrorComponent } from './pages/error/error.component';
import { BalanceComponent } from './components/balance/balance.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { EditComponent } from './components/moviment/edit/edit.component';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidemenuComponent,
    FooterComponent,
    HomeComponent,
    HomeRightCardComponent,
    HomeLeftCardComponent,
    AboutComponent,
    AboutStandardCardComponent,
    IntegrantLeftCardComponent,
    IntegrantRightCardComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    InputComponent,
    ForgotpassComponent,
    HistoryComponent,
    BalanceComponent,
    ErrorComponent,
    FeedbackComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatExpansionModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-PT' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
