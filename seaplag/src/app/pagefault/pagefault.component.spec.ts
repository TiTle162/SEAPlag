import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagefaultComponent } from './pagefault.component';

describe('PagefaultComponent', () => {
  let component: PagefaultComponent;
  let fixture: ComponentFixture<PagefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
