import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowcasePage } from './showcase.page';

describe('ShowcasePage', () => {
  let component: ShowcasePage;
  let fixture: ComponentFixture<ShowcasePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
