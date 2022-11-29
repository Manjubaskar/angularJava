import { TestBed } from '@angular/core/testing';

import { PositionserviceService } from './positionservice.service';

describe('PositionserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PositionserviceService = TestBed.get(PositionserviceService);
    expect(service).toBeTruthy();
  });
});
