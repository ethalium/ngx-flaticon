import {TestBed} from '@angular/core/testing';
import {FlatIconService} from './flat-icon.service';
import {FlatIconModule} from "../flat-icon.module";

describe('FlatIconService', () => {
  let fiService: FlatIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FlatIconModule.forRoot({
          defaultType: 'straight',
          defaultWeight: 'bold'
        })
      ]
    });
    fiService = TestBed.inject(FlatIconService);
  });

  it('Should be created', () => {
    expect(fiService).toBeTruthy();
  });

  it('Should return more than zero icons', () => {
    expect(fiService.find().length).toBeGreaterThan(0);
  });

  it('Should resolve the "globe" icon with type "straight" and weight "solid".', () => {
    const icon = fiService.findOne('globe', { type: 'straight', weight: 'solid' });
    expect(icon?.className).toBe('fi-ss-globe');
  })

  it('Should resolve the "globe-alt" icon with type "straight" and weight "bold".', () => {
    const icon = fiService.findOne('globe-alt');
    expect(icon?.className).toBe('fi-bs-globe-alt');
  })

  it('Should resolve the "google" icon with type "brands".', () => {
    const icon = fiService.findOne('google');
    expect(icon?.className).toBe('fi-brands-google');
  })
});
