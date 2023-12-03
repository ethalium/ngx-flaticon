import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  RendererStyleFlags2
} from "@angular/core";
import {FlatIconAnimationType, FlatIconType, FlatIconWeight} from "../interfaces/flat-icon.interface";
import {FlatIconService, getFlatIcon} from "../services/flat-icon.service";
import {debounceTime, Subject} from "rxjs";

interface FlatIconDirectiveData {
  name: string;
  color: string|null;
  type: FlatIconType,
  weight: FlatIconWeight,
  animation: FlatIconAnimationType|null;
  duration: number;
  delay: number;
}

@Directive({
  selector: 'fi-icon, [fi-icon]',
  host: {
    '[class.fi-icon]': 'true',
  }
})

export class FlatIconDirective implements OnInit, OnChanges, OnDestroy {
  private changes$ = new Subject<void>();

  @Input({ required: true }) name!: string;
  @Input() color?: string|null;
  @Input() type?: FlatIconType|null;
  @Input() weight?: FlatIconWeight|null;
  @Input() animation?: FlatIconAnimationType;
  @Input() duration?: number|null;
  @Input() delay?: number|null;

  private elementData?: FlatIconDirectiveData|null;
  private elementClasses: string[] = [];
  private elementStyles: { [key: string]: any } = {};

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,

    @Optional() private fiService: FlatIconService = getFlatIcon(),
  ){}

  ngOnInit(){
    this.changes$.pipe(debounceTime(0)).subscribe(() => {

      // get data
      const data = this.data;

      // get icon
      const icon = this.fiService.findOne(data.name, {
        type: data.type,
        weight: data.weight,
      });

      // get animation
      const animation = !data.animation ? null : this.fiService.getAnimation(data.animation);

      // skip if data and elementData are equal
      if(!icon || (this.elementData && JSON.stringify(this.elementData) === JSON.stringify(data))){
        return;
      }

      // clear element
      this.clear();

      // add base classes
      this.elementClasses.push('fi', icon.className);

      // set base styles
      if(this.elementRef.nativeElement.tagName === 'FI-ICON') {
        this.elementStyles['display'] = 'inline-block';
        this.elementStyles['line-height'] = '1';
      }

      // set animation
      if(animation){
        this.elementClasses.push(animation.className);
        this.elementStyles['--fi-animation-duration'] = `${data.duration}ms`;
        this.elementStyles['--fi-animation-delay'] = `${data.delay}ms`;
      }

      // apply class and style objects
      this.elementClasses.map(c => this.renderer2.addClass(this.elementRef.nativeElement, c));
      Object.entries(this.elementStyles).map(s => this.renderer2.setStyle(this.elementRef.nativeElement, s[0], s[1], RendererStyleFlags2.Important));

      // mark for check
      this.changeDetectorRef.markForCheck();

    });
    this.changes$.next();
  }

  ngOnChanges(){
    this.changes$.next();
  }

  ngOnDestroy(){
    this.clear();
    if(!this.changes$.closed){
      this.changes$.complete();
    }
  }

  private get data(): FlatIconDirectiveData {
    return {
      name: this.name,
      color: this.color || null,
      type: this.type || this.fiService.options.defaultType,
      weight: this.weight || this.fiService.options.defaultWeight,
      animation: this.animation || null,
      duration: (this.duration && this.duration > 0) ? this.duration : 1000,
      delay: (this.delay && this.delay > 0) ? this.delay : 0,
    }
  }

  private clear() {

    // remove classes and styles
    try{
      this.elementClasses.map(c => this.renderer2.removeClass(this.elementRef.nativeElement, c));
      Object.keys(this.elementStyles).map(s => this.renderer2.removeStyle(this.elementRef.nativeElement, s));
    }catch{
      // ignore all errors
    }

    // clear class and style objects
    this.elementClasses = [];
    this.elementStyles = {};

  }

}
