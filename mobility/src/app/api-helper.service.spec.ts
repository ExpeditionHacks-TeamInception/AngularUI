import { TestBed, inject } from '@angular/core/testing';

import { ApiHelperService } from './api-helper.service';

describe('ApiHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiHelperService]
    });
  });

  it('should be created', inject([ApiHelperService], (service: ApiHelperService) => {
    expect(service).toBeTruthy();
  }));
});
