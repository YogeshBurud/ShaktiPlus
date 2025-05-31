import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDilogComponent } from './my-dilog.component';

describe('MyDilogComponent', () => {
  let component: MyDilogComponent;
  let fixture: ComponentFixture<MyDilogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDilogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDilogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
