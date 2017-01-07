/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ExploreService } from './explore.service';

describe('ExploreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExploreService]
    });
  });

  it('should ...', inject([ExploreService], (service: ExploreService) => {
    expect(service).toBeTruthy();
  }));
});
