import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPesquisaComponent } from './user-pesquisa.component';

describe('UserPesquisaComponent', () => {
  let component: UserPesquisaComponent;
  let fixture: ComponentFixture<UserPesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPesquisaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
