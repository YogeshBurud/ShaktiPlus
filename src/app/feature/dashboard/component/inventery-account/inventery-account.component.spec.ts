import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventeryAccountComponent } from './inventery-account.component';

describe('InventeryAccountComponent', () => {
  let component: InventeryAccountComponent;
  let fixture: ComponentFixture<InventeryAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventeryAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventeryAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
