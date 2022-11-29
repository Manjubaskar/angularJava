import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatTableModule } from '@angular/material';
import { ContactComponent } from './contact/contact.component';
import { PositionComponent } from './position/position.component';
import { FilterPipe } from './filter.pipe/filter.pipe.component';
import { HomeComponent } from './home/home.component';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DataTableComponent } from './data-table/data-table.component';
import { MatSortModule } from '@angular/material/sort';
import { ReportComponent } from './report/report.component';



@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    PositionComponent,
  FilterPipe,
  HomeComponent,
  DataTableComponent,
  ReportComponent,
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule, 
    MatProgressBarModule, MatSortModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[MatFormFieldModule,
    MatInputModule,]
})
export class AppModule { }
