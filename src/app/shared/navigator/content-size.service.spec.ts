/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ContentSizeService } from './content-size.service';

describe('ContentSizeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContentSizeService]
    });
  });

  it('should ...', inject([ContentSizeService], (service: ContentSizeService) => {
    expect(service).toBeTruthy();
  }));
});
