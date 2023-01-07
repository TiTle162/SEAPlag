import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { GraphComponent } from './graph/graph.component';
import { DetailsComponent } from './details/details.component';
import { ImportComponent } from './import/import.component';
import { PagefaultComponent } from './pagefault/pagefault.component';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NgxSpinnerModule } from 'ngx-spinner';

import { HttpClientModule } from '@angular/common/http';

const appRoute: Routes = [
  {path: '', component: ImportComponent},
  {path: 'Home', component: ImportComponent},
  {path: 'Graph', component: GraphComponent},
  {path: 'Details', component: DetailsComponent},
  {path: '**', component: PagefaultComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    DetailsComponent,
    ImportComponent,
    PagefaultComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute),
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxSliderModule,
    NgxFileDropModule,
    NgxSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
