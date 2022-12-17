import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { GraphComponent } from './graph/graph.component';
import { DetailsComponent } from './details/details.component';
import { ImportComponent } from './import/import.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { PagefaultComponent } from './pagefault/pagefault.component';

import { NgxFileDropModule } from 'ngx-file-drop';
import { HttpClientModule } from '@angular/common/http';

const appRoute: Routes = [
  {path: '', component: ImportComponent},
  {path: 'Home', component: ImportComponent},
  {path: 'Graph', component: GraphComponent},
  {path: 'Details/:source/:target', component: DetailsComponent},
  {path: '**', component: PagefaultComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    DetailsComponent,
    ImportComponent,
    PagefaultComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    NgxSliderModule,
    HttpClientModule,
    NgxFileDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
