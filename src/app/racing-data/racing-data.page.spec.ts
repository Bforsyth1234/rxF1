import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RacingDataPage } from './racing-data.page';
import { RaceDataService } from '../race-data.service';
import { Race } from '../models/race';
import { of } from 'rxjs';

describe('RacingDataPage', () => {
  let component: RacingDataPage;
  let fixture: ComponentFixture<RacingDataPage>;
  let raceDataService: RaceDataService;


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RacingDataPage],
      imports: [IonicModule.forRoot(), HttpClientTestingModule]

    }).compileComponents();

    fixture = TestBed.createComponent(RacingDataPage);
    component = fixture.componentInstance;
    component.offset = 20;
    raceDataService = TestBed.inject(RaceDataService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    // Arrange
    const title = 'F1 - Data';
    // Act
    const titleElement = fixture.nativeElement.querySelector('ion-title');
    // Assert
    expect(titleElement.textContent).toEqual(title);
  });


  it('should show the previous button', () => {
    // Arrange
    const title = 'Previous';
    // Act
    component.offset = 20;
    const buttonElement = fixture.nativeElement.querySelector('ion-button');
    // Assert
    expect(buttonElement.textContent).toContain(title);
  });


  it('should get races per season', () => {
    const dummyRaces: Race[] = [
      {
        season: '2022',
        round: '1',
        url: 'http://en.wikipedia.org/wiki/2022_Australian_Grand_Prix',
        raceName: 'Australian Grand Prix',
        date: '2022-03-20',
        time: '06:00:00Z',
        results: [],
      },
    ];
    spyOn(raceDataService, 'getRacesPerSeason').and.returnValue(of(dummyRaces));
    component.getRacesPerSeason();
    component.racesPerSeason.subscribe(data => {
      expect(data).toEqual(dummyRaces);
    })
  })
});
