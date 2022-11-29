import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './../services/api.service';
import { Contact } from './../models/contact';
import { PositionserviceService } from '../services/positionservice.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Position } from '../models/position';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'title', 'email', 'phone', 'address', 'city','position', 'actions'];
  // searchText:string;
  // dataSource  = [];
   position=[];
  contact = {};
  student: Contact[] = [];
  public dataSource = new MatTableDataSource<Contact>();
  public des = new MatTableDataSource<Position>();

  constructor(private apiService: ApiService, private PositionserviceService:PositionserviceService,private _liveAnnouncer: LiveAnnouncer) { }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  
  ngOnInit() {
    this.apiService.readContacts().subscribe((result) => {
    this.dataSource.data  =  result;
    console.log( this.dataSource.data );

  });
    this.PositionserviceService.readPositions().subscribe((result) => {
      this.position  =  result;

    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.des.filter  =  filterValue.trim().toLowerCase();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    console.log( this.dataSource.paginator );
    this.dataSource.sort = this.sort;

}

announceSortChange(sortState: Sort) {

  if (sortState.direction) {
    this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  } else {
    this._liveAnnouncer.announce('Sorting cleared');
  }
}
  selectContact(contact) {
    this.contact = contact;
  }

  newContact() {
    this.contact = {};
  }

  createContact(f) {
    const val = {
      "name": f.value.name,
    "title": f.value.title,
    "email": f.value.email,
    "phone": f.value.phone,
    "address": f.value.address,
    "city": f.value.city ,
    "position":{
    "position_id":f.value.position}
    }

    console.log(val);
   
    this.apiService.createContact(val).subscribe((result) => {
      console.log(result);
    });
    this.PositionserviceService.readPositions().subscribe((result) => {
      this.position  =  result;

    });
    

  }
  

  deleteContact(id) {
    this.apiService.deleteContact(id).subscribe((result) => {
      console.log(result);
    });
  }

  updateContact(f) {
    // tslint:disable-next-line:no-string-literal
    f.value.id = this.contact['id'];

    const val = {
      "id":f.value.id,
      "name": f.value.name,
    "title": f.value.title,
    "email": f.value.email,
    "phone": f.value.phone,
    "address": f.value.address,
    "city": f.value.city ,
    "position":{
    "position_id":f.value.position}
    }
    console.log(val);
    this.apiService.updateContact(val).subscribe((result) => {
      console.log(result);
    });
  }

}
