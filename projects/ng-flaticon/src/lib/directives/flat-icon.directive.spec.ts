import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FlatIconModule} from "../flat-icon.module";
import {Component, Input, ViewChild} from "@angular/core";
import {FlatIconDirective} from "./flat-icon.directive";
import {firstValueFrom, timer} from "rxjs";

@Component({
  selector: 'test-flat-icon-directive',
  template: `<fi-icon id="iconTest" [name]="'empty'"></fi-icon>`,
})
export class TestFlatIconDirective {
  @ViewChild(FlatIconDirective) icon!: FlatIconDirective;
}

function sleep(duration: number): Promise<void> {
  return firstValueFrom(timer(duration)) as unknown as Promise<void>;
}

describe('FlatIconDirective', () => {
  let fixture: ComponentFixture<TestFlatIconDirective>;
  let element: HTMLElement;
  let icon: FlatIconDirective;

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
    icon = fixture.componentInstance.icon;
    expect(fixture).toBeTruthy();
  });

  it('Icon element should be created', () => {
    element = fixture.nativeElement.querySelector('#iconTest');
    expect(element).toBeTruthy();
  });

  it('Should load the icon "globe" with type "straight" and weight "bold".', async () => {
    icon.name = 'globe';
    icon.ngOnChanges();
    await sleep(1000);
    expect(element.className).toBe('fi-icon fi fi-bs-globe');
  });

  it('Should load the icon "check" with type "straight" and weight "bold".', async () => {
    icon.name = 'check';
    icon.ngOnChanges();
    await sleep(1000);
    expect(element.className).toBe('fi-icon fi fi-bs-check');
  });
});
