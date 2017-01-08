/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { FileDetailsService } from './file-details.service';

describe('FileDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileDetailsService]
    });
  });

  it('should ...', inject([FileDetailsService], (service: FileDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
