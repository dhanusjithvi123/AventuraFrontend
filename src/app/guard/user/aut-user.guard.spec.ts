import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { autUserGuard } from './aut-user.guard';
import { RouterTestingModule } from '@angular/router/testing';



describe('AuthGuard', () => {
  let guard:autUserGuard  ;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [autUserGuard ]
    });
    guard = TestBed.inject(autUserGuard );
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});