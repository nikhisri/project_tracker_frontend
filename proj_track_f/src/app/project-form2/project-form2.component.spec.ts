import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectForm2Component } from './project-form2.component';

describe('ProjectForm2Component', () => {
  let component: ProjectForm2Component;
  let fixture: ComponentFixture<ProjectForm2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectForm2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
