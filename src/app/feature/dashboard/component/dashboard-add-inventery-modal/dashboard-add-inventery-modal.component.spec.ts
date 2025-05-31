import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAddInventeryModalComponent } from './dashboard-add-inventery-modal.component';

describe('DashboardAddInventeryModalComponent', () => {
  let component: DashboardAddInventeryModalComponent;
  let fixture: ComponentFixture<DashboardAddInventeryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAddInventeryModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAddInventeryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
