import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrudModalComponent } from './form-crud-modal.component';

describe('FormCrudModalComponent', () => {
  let component: FormCrudModalComponent;
  let fixture: ComponentFixture<FormCrudModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCrudModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCrudModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
