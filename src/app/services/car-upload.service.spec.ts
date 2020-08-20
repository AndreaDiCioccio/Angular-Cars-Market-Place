/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CarUploadService } from './car-upload.service';

describe('Service: CarUpload', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarUploadService]
    });
  });

  it('should ...', inject([CarUploadService], (service: CarUploadService) => {
    expect(service).toBeTruthy();
  }));
});
