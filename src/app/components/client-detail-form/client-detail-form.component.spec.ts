import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailFormComponent } from './client-detail-form.component';

describe('ClientDetailFormComponent', () => {
  let component: ClientDetailFormComponent;
  let fixture: ComponentFixture<ClientDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDetailFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
