import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddNewTrukfortrukbidPage } from './add-new-trukfortrukbid.page';

describe('AddNewTrukfortrukbidPage', () => {
  let component: AddNewTrukfortrukbidPage;
  let fixture: ComponentFixture<AddNewTrukfortrukbidPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewTrukfortrukbidPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewTrukfortrukbidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
