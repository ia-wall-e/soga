import { TestBed } from '@angular/core/testing';

import { FiltersProductsService } from './filters-products.service';

describe('FiltersProductsService', () => {
  let service: FiltersProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltersProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
