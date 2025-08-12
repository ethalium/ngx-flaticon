import {TestBed} from '@angular/core/testing';
import {FlatIconModule} from "../flat-icon.module";
import {Component, ViewChild} from "@angular/core";
import {FlatIconDirective} from "./icon.directive";
import {firstValueFrom, interval} from "rxjs";

@Component({
    selector: 'test-icon-directive',
    template: `<fi [name]="'empty'"></fi>`,
    standalone: false
})
export class TestIconDirective {
  @ViewChild(FlatIconDirective) icon!: FlatIconDirective;
}

describe('FlatIconDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FlatIconModule,
        FlatIconModule.forRoot({
          defaultFamily: 'straight',
          defaultWeight: 'bold'
        })
      ],
      declarations: [TestIconDirective]
    });
  });



  it('Directive should be created', () => {
    const fixture = TestBed.createComponent(TestIconDirective); fixture.detectChanges();
    expect(fixture).toBeTruthy();
  });



  it('Icon element should be created', () => {
    const fixture = TestBed.createComponent(TestIconDirective); fixture.detectChanges();
    const icon = fixture.componentInstance.icon;
    expect(icon).toBeTruthy();
  });



  it('Should load the icon "globe" with family "straight" and weight "bold".', async () => {
    const fixture = TestBed.createComponent(TestIconDirective); fixture.detectChanges();
    const icon = fixture.componentInstance.icon;
    icon.name = 'globe';
    icon.ngOnChanges();
    await firstValueFrom(interval(1000));
    expect(icon.element.classList).toContain('fi-bs-globe');
  });



  it('Should load the icon "check" with family "straight" and weight "bold".', async () => {
    const fixture = TestBed.createComponent(TestIconDirective); fixture.detectChanges();
    const icon = fixture.componentInstance.icon;
    icon.name = 'check';
    icon.ngOnChanges();
    await firstValueFrom(interval(1000));
    expect(icon.element.classList).toContain('fi-bs-check');
  });



  it('Should load the icon "google" of family "brands".', async () => {
    const fixture = TestBed.createComponent(TestIconDirective); fixture.detectChanges();
    const icon = fixture.componentInstance.icon;
    icon.name = 'google';
    icon.ngOnChanges();
    await firstValueFrom(interval(1000));
    expect(icon.element.classList).toContain('fi-brands-google');
  });
});
