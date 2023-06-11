interface Race {
  grandPrix: string;
  date: string;
  winner: string;
  car: string;
  laps: number | null;
  time: string;
  raceResult: {
    name: string;
    date: string;
    city: string;
    result: {
      pos: string;
      no: string;
      driver: string;
      car: string;
      lap: number;
      time: string;
      pts: number;
    }[];
  };
}

interface Driver {
  pos: string;
  driver: string;
  nationality: string;
  car: string;
  pts: number;
  driverResult: {
    grandPrix: string;
    date: string;
    car: string;
    racePosition: number | null;
    pts: number;
  }[];
}

interface Team {
  pos: string;
  team: string;
  pts: number;
  teamResult: {
    grandPrix: string;
    date: string;
    pts: number;
  }[];
}

interface DHLFastestLap {
  grandPrix: string;
  driver: string;
  car: string;
  time: string;
}

export interface F1Result {
  [key: string]: {
    races: Race[];
    drivers: Driver[];
    teams: Team[];
    dhlFastestLaps: DHLFastestLap[];
  };
}
