import {TestBed} from '@angular/core/testing';
import {FlatIconModule} from "../flat-icon.module";
import {Component, ViewChild} from "@angular/core";
import {FlatIconDirective} from "./icon.directive";
import {firstValueFrom, interval} from "rxjs";
import {FlatIconDuotoneDirective} from "./icon-duotone.directive";

@Component({
    selector: 'test-icon-duo-directive',
    template: `<fi-duo [name]="'empty'"></fi-duo>`,
    standalone: false
})
export class TestFlatIconDuotoneDirective {
  @ViewChild(FlatIconDuotoneDirective) icon!: FlatIconDuotoneDirective;
}

describe('FlatIconDuotoneDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FlatIconModule,
        FlatIconModule.forRoot({
          defaultFamily: 'straight',
          defaultWeight: 'bold'
        })
      ],
      declarations: [TestFlatIconDuotoneDirective]
    });
  });



  it('Directive should be created', () => {
    const fixture = TestBed.createComponent(TestFlatIconDuotoneDirective); fixture.detectChanges();
    expect(fixture).toBeTruthy();
  });



  it('Icon element should be created', () => {
    const fixture = TestBed.createComponent(TestFlatIconDuotoneDirective); fixture.detectChanges();
    const icon = fixture.componentInstance.icon;
    expect(icon).toBeTruthy();
  });



  it('Should load the icon "add" with family "straight" and weight "duotone".', async () => {
    const fixture = TestBed.createComponent(TestFlatIconDuotoneDirective); fixture.detectChanges();
    const icon = fixture.componentInstance.icon;
    icon.name = 'add';
    icon.ngOnChanges();
    await firstValueFrom(interval(1000));
    expect(icon.element.classList).toContain('fi-ds-add');
  });



  it('Should load the icon "add-document" with family "straight" and weight "duotone".', async () => {
    const fixture = TestBed.createComponent(TestFlatIconDuotoneDirective); fixture.detectChanges();
    const icon = fixture.componentInstance.icon;
    icon.name = 'add-document';
    icon.ngOnChanges();
    await firstValueFrom(interval(1000));
    expect(icon.element.classList).toContain('fi-ds-add-document');
  });
});
