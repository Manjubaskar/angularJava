import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Position } from '../models/position';

@Injectable({
  providedIn: 'root'
})
export class PositionserviceService {
  API_SERVER = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }

  public readPositions() {
    return this.httpClient.get<Position[]>(`${this.API_SERVER}/positions`);
  }

  public createPosition(position: Position) {
    return this.httpClient.post<Position>(`${this.API_SERVER}/positions/create`, position);
  }

  public updatePosition(position: Position) {
    return this.httpClient.put<Position>(`${this.API_SERVER}/positions/${position.position_id}/update`, position);
  }

  public deletePosition(position_id: number) {
    return this.httpClient.delete(`${this.API_SERVER}/positions/${position_id}/delete`);
  }
}
