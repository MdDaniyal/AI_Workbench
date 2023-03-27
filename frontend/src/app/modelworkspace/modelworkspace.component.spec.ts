import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelworkspaceComponent } from './modelworkspace.component';

describe('ModelworkspaceComponent', () => {
  let component: ModelworkspaceComponent;
  let fixture: ComponentFixture<ModelworkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelworkspaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelworkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
