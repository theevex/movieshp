import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagenofoundComponentComponent } from './pagenofound-component.component';

describe('PagenofoundComponentComponent', () => {
  let component: PagenofoundComponentComponent;
  let fixture: ComponentFixture<PagenofoundComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagenofoundComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagenofoundComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function beforeEach(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}

