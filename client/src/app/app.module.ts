import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';

import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInterceptor } from './app-interceptor';
import { MenuModule } from './menu/menu.module';
import { NontFoundComponent } from './components/nont-found/nont-found.component';
import { AboutComponent } from './components/about/about.component';
import { HttpErrorInterceptor } from './error-interceptor';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    NontFoundComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    UserModule,
    MenuModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }) 
  ],
 
  providers : [{
    provide : HTTP_INTERCEPTORS,
    useClass : AppInterceptor,
    multi : true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  }
],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
