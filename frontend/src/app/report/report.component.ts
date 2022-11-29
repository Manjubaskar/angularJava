import { Component, ElementRef, ViewChild } from '@angular/core';
import { PositionserviceService } from '../services/positionservice.service';
import { ReportService } from './../services/report.service';
 
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
 pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  //  title = 'htmltopdf';
  
  @ViewChild('pdfTable', { static: true }) pdfTable: ElementRef;
  displayedColumns: string[] = ['id', 'name', 'title', 'email', 'phone', 'address', 'city','position'];
  // searchText:string;
  dataSource  = [];
   position=[];
  // contact = {};
  // student: Contact[] = [];

  //public dataSource = new MatTableDataSource<Contact>();
  
  constructor(  private PositionserviceService:PositionserviceService, private ReportService:ReportService) {  }

  start_date: string = '';

  end_date: string = '';
  setValue(start_date:string,end_date:string) {

    
    console.log('start_date: ',start_date);
    console.log('end_date: ',end_date);
    this.ReportService.readContacts(start_date,end_date).subscribe((result) => {
      this.dataSource  =  result;
      console.log( this.dataSource);
    });
    this.PositionserviceService.readPositions().subscribe((result) => {
      this.position  =  result;

    });

    

  }

  public downloadAsPDF() {
    // const doc = new jsPDF();
    const pdfTable = this.pdfTable.nativeElement;
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open();   
  }
}
