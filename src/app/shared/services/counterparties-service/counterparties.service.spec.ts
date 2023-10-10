import { TestBed } from '@angular/core/testing';

import { CounterpartiesService } from './counterparties.service';

describe('CounterpartiesService', () => {
  let service: CounterpartiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterpartiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
