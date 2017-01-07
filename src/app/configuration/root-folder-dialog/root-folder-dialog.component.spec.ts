/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RootFolderDialogComponent } from './root-folder-dialog.component';

describe('RootFolderDialogComponent', () => {
  let component: RootFolderDialogComponent;
  let fixture: ComponentFixture<RootFolderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RootFolderDialogComponent]
    })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RootFolderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
