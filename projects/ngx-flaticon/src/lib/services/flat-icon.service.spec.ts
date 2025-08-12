import {TestBed} from '@angular/core/testing';
import {FlatIconService} from './flat-icon.service';
import {FlatIconModule} from "../flat-icon.module";

describe('FlatIconService', () => {
  let fiService: FlatIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FlatIconModule.forRoot({
          defaultFamily: 'straight',
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

  it('Should resolve the "globe" icon with family "straight" and style "solid".', () => {
    const icon = fiService.findOne('globe', { family: 'straight', weight: 'solid' });
    expect(icon?.className).toBe('fi-ss-globe');
  })

  it('Should resolve the "globe-alt" icon with family "straight" and style "bold".', () => {
    const icon = fiService.findOne('globe-alt');
    expect(icon?.className).toBe('fi-bs-globe-alt');
  })

  it('Should resolve the "google" icon with family "brands".', () => {
    const icon = fiService.findOne('google');
    expect(icon?.className).toBe('fi-brands-google');
  })
});
