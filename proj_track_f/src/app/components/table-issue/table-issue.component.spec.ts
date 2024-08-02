import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableIssueComponent } from './table-issue.component';

describe('TableIssueComponent', () => {
  let component: TableIssueComponent;
  let fixture: ComponentFixture<TableIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
