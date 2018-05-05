import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwSubmissionComponent } from './veiw-submission.component';

describe('VeiwSubmissionComponent', () => {
  let component: VeiwSubmissionComponent;
  let fixture: ComponentFixture<VeiwSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeiwSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeiwSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
