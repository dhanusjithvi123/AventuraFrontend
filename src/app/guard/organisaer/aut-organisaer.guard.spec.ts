import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { OrganisaerGuard } from './aut-organisaer.guard';


describe('AuthGuard', () => {
  let guard: OrganisaerGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [OrganisaerGuard]
    });
    guard = TestBed.inject(OrganisaerGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
