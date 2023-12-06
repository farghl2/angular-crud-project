import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeadersInterceptor } from './interceptors/headers.interceptor';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { CatchErorrInterceptor } from './interceptors/catch-erorr.interceptor';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'square-loader' }),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      },
      defaultLanguage: 'en'
  }),
    NgxPaginationModule,

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:HeadersInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:SpinnerInterceptor, multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:CatchErorrInterceptor , multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
