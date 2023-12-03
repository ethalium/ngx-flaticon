import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FlatIconModule} from "../flat-icon.module";
import {Component} from "@angular/core";

@Component({
  selector: 'test-flat-icon-directive',
  template: `<fi-icon id="iconTest" [name]="'globe'"></fi-icon>`,
})
export class TestFlatIconDirective {}


describe('FlatIconDirective', () => {
  let fixture: ComponentFixture<TestFlatIconDirective>;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FlatIconModule,
        FlatIconModule.forRoot({
          defaultType: 'straight',
          defaultWeight: 'bold'
        })
      ],
      declarations: [TestFlatIconDirective]
    });
  });

  it('Directive should be created', () => {
    fixture = TestBed.createComponent(TestFlatIconDirective);
    fixture.detectChanges();
    expect(fixture).toBeTruthy();
  });

  it('Icon element should be created', () => {
    element = fixture.nativeElement.querySelector('#iconTest');
    expect(element).toBeTruthy();
  });

  it('Should load the icon with type "straight" and weight "bold".', () => {
    expect(element.className).toBe('fi-icon fi fi-bs-globe');
  });
});
