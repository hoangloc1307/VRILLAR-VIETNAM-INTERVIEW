import f1Result from "@/assets/f1ResultData.json";
import { useState } from "react";
import { F1Result } from "./types/f1Result.type";

type ViewType = "races" | "drivers" | "teams" | "dhlFastestLaps";

export default function App() {
  const [data, setData] = useState<F1Result>(f1Result);
  const [year, setYear] = useState<string>("2023");
  const [view, setView] = useState<ViewType>("races");

  return (
    <main className="min-h-screen px-10">
      <h1 className="text-2xl font-bold text-center p-2">F1 Result</h1>
      <div className="flex justify-center gap-5 mt-2">
        <div>
          <label className="font-medium" htmlFor="yearSelect">
            Year:
          </label>
          <select
            className="border border-slate-500 rounded ml-1 outline-none"
            id="yearSelect"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {Object.keys(data)
              .reverse()
              .map((year) => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="font-medium" htmlFor="viewSelect">
            View:
          </label>
          <select
            className="border border-slate-500 rounded ml-1 outline-none"
            id="viewSelect"
            value={view}
            onChange={(e) => setView(e.target.value as ViewType)}
          >
            <option value="races">Races</option>
            <option value="drivers">Drivers</option>
            <option value="teams">Teams</option>
            <option value="dhlFastestLaps">DHL Fastest Lap Award</option>
          </select>
        </div>
      </div>

      {/* Races */}
      {view === "races" && (
        <>
          <h2 className="text-xl font-bold mt-10">{`${year} Race Result`}</h2>
          <table className="w-full text-left mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="px-2 py-1">Grand Prix</th>
                <th className="px-2 py-1">Date</th>
                <th className="px-2 py-1">Winner</th>
                <th className="px-2 py-1">Car</th>
                <th className="px-2 py-1">Laps</th>
                <th className="px-2 py-1">Time</th>
              </tr>
            </thead>
            <tbody>
              {data[year].races.map((race, index) => (
                <tr key={index} className="odd:bg-slate-100">
                  <td className="px-2 py-1">{race.grandPrix}</td>
                  <td className="px-2 py-1">{race.date}</td>
                  <td className="px-2 py-1">{race.winner}</td>
                  <td className="px-2 py-1">{race.car}</td>
                  <td className="px-2 py-1">{race.laps}</td>
                  <td className="px-2 py-1">{race.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Drivers */}
      {view === "drivers" && (
        <>
          <h2 className="text-xl font-bold mt-10">{`${year} Driver Standings`}</h2>
          <table className="w-full text-left mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="px-2 py-1">POS</th>
                <th className="px-2 py-1">Driver</th>
                <th className="px-2 py-1">Nationality</th>
                <th className="px-2 py-1">Car</th>
                <th className="px-2 py-1">PTS</th>
              </tr>
            </thead>
            <tbody>
              {data[year].drivers.map((driver, index) => (
                <tr key={index} className="odd:bg-slate-100">
                  <td className="px-2 py-1">{driver.pos}</td>
                  <td className="px-2 py-1">{driver.driver}</td>
                  <td className="px-2 py-1">{driver.nationality}</td>
                  <td className="px-2 py-1">{driver.car}</td>
                  <td className="px-2 py-1">{driver.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* Teams */}
      {view === "teams" && (
        <>
          <h2 className="text-xl font-bold mt-10">{`${year} Constructor Standings`}</h2>
          <table className="w-full text-left mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="px-2 py-1">POS</th>
                <th className="px-2 py-1">Team</th>
                <th className="px-2 py-1">PTS</th>
              </tr>
            </thead>
            <tbody>
              {data[year].teams.map((team, index) => (
                <tr key={index} className="odd:bg-slate-100">
                  <td className="px-2 py-1">{team.pos}</td>
                  <td className="px-2 py-1">{team.team}</td>
                  <td className="px-2 py-1">{team.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* DHL Fastest */}
      {view === "dhlFastestLaps" && (
        <>
          <h2 className="text-xl font-bold mt-10">{`${year} DHL Fastest Lap Award`}</h2>
          <table className="w-full text-left mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="px-2 py-1">Grand Prix</th>
                <th className="px-2 py-1">Driver</th>
                <th className="px-2 py-1">Car</th>
                <th className="px-2 py-1">Time</th>
              </tr>
            </thead>
            <tbody>
              {data[year].dhlFastestLaps.map((dhl, index) => (
                <tr key={index} className="odd:bg-slate-100">
                  <td className="px-2 py-1">{dhl.grandPrix}</td>
                  <td className="px-2 py-1">{dhl.driver}</td>
                  <td className="px-2 py-1">{dhl.car}</td>
                  <td className="px-2 py-1">{dhl.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </main>
  );
}
