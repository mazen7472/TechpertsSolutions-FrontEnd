import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollProgressComponent } from './scroll-progress.component';

describe('ScrollProgressComponent', () => {
  let component: ScrollProgressComponent;
  let fixture: ComponentFixture<ScrollProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScrollProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
