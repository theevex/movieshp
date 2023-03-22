import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionMovieComponent } from './description-movie.component';

describe('DescriptionMovieComponent', () => {
  let component: DescriptionMovieComponent;
  let fixture: ComponentFixture<DescriptionMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptionMovieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescriptionMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
