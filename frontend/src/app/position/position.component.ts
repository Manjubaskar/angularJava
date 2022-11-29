import { Component, OnInit } from '@angular/core';
import { PositionserviceService } from './../services/positionservice.service'
import { Position } from './../models/position';
@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {

  displayedColumns: string[] = ['position_id', 'position_name','actions'];
  dataSource  = [];
  position = {};
  constructor(private PositionserviceService: PositionserviceService) { }

  ngOnInit():void {
    this.PositionserviceService.readPositions().subscribe((result) => {
      this.dataSource  =  result;
      });
  }

  selectPosition(position) {
    this.position = position;
  }

  newPosition() {
    this.position = {};
  }

  createPosition(f) {
    this.PositionserviceService.createPosition(f.value).subscribe((result) => {
      console.log(result);
    });

  }

  deletePosition(position_id) {
    this.PositionserviceService.deletePosition(position_id).subscribe((result) => {
      console.log(result);
    });
  }

  updatePosition(f) {
    // tslint:disable-next-line:no-string-literal
    f.value.position_id = this.position['position_id'];
    this.PositionserviceService.updatePosition(f.value).subscribe((result) => {
      console.log(result);
    });
  }
}
