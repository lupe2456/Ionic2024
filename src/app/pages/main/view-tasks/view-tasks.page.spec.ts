import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTasksPage } from './view-tasks.page';

describe('ViewTasksPage', () => {
  let component: ViewTasksPage;
  let fixture: ComponentFixture<ViewTasksPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewTasksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
