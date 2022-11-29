import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { DataTableComponent } from './data-table/data-table.component';
import { HomeComponent } from './home/home.component';
import { PositionComponent } from './position/position.component';
import { ReportComponent } from './report/report.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },
  { path: 'index', component: HomeComponent },
  { path: '', pathMatch: 'full', redirectTo: 'details' },
  { path: 'details', component: ContactComponent },
  { path: '', pathMatch: 'full', redirectTo: 'positions' },
  { path: 'positions', component: PositionComponent },
  { path: '', pathMatch: 'full', redirectTo: 'report' },
  { path: 'report', component: ReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
