/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { GdriveService } from './gdrive.service';

describe('GdriveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GdriveService]
    });
  });

  it('should ...', inject([GdriveService], (service: GdriveService) => {
    expect(service).toBeTruthy();
  }));
});
