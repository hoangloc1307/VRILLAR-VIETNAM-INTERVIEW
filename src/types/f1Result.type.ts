interface Race {
  grandPrix: string;
  date: string;
  winner: string;
  car: string;
  laps: number | null;
  time: string;
}

interface Driver {
  pos: number | null;
  driver: string;
  nationality: string;
  car: string;
  pts: number;
}

interface Team {
  pos: number | null;
  team: string;
  pts: number;
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
