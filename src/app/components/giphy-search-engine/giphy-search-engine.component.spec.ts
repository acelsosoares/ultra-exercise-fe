import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { GiphySearchEngineComponent } from './giphy-search-engine.component';

describe('GiphySearchEngineComponent', () => {
  let component: GiphySearchEngineComponent;
  let fixture: ComponentFixture<GiphySearchEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiphySearchEngineComponent ],
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiphySearchEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
