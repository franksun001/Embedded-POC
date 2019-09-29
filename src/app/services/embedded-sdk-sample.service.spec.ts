import { TestBed } from '@angular/core/testing';

import { EmbeddedSdkSampleService } from './embedded-sdk-sample.service';

describe('EmbeddedSdkSampleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmbeddedSdkSampleService = TestBed.get(EmbeddedSdkSampleService);
    expect(service).toBeTruthy();
  });
});
