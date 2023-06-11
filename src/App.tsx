import f1Result from "@/assets/f1ResultData.json";
import { useEffect, useState } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { TBody, TData, THead, THeading, TRow, Table } from "./components/Table";
import useQueryParams from "./hooks/useQueryParams";
import { F1Result } from "./types/f1Result.type";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

type ViewType = "races" | "drivers" | "teams" | "dhlFastestLaps";

export default function App() {
  const [data] = useState<F1Result>(f1Result as F1Result);
  const navigate = useNavigate();
  const queryParams = useQueryParams();
  const {
    view = "races",
    year = "2023",
    q = "",
  }: { view?: ViewType; year?: string; q?: string } = queryParams;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (q) {
      let index = 0;
      switch (view) {
        case "races":
          index = data[year].races.findIndex((i) => i.grandPrix === q);
          break;
        case "drivers":
          index = data[year].drivers.findIndex((i) => i.driver === q);
          break;
        case "teams":
          index = data[year].teams.findIndex((i) => i.team === q);
          break;
      }
      setCurrentIndex(index > 0 ? index : 0);
    } else {
      setCurrentIndex(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view, year, q]);

  const handleClick = (type: ViewType, value: string) => () => {
    navigate({
      search: createSearchParams({
        ...queryParams,
        view: type,
        q: value,
      }).toString(),
    });
  };

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-2xl font-bold text-center p-2 uppercase">
        F1 Result
      </h1>
      <div className="flex justify-center gap-5 mt-2">
        <div>
          <label className="font-medium" htmlFor="yearSelect">
            Year:
          </label>
          <select
            className="border border-slate-500 rounded ml-1 outline-none"
            id="yearSelect"
            value={year}
            onChange={(e) =>
              navigate({
                search: createSearchParams({
                  ...queryParams,
                  year: e.target.value,
                }).toString(),
              })
            }
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
            onChange={(e) =>
              navigate({
                search: createSearchParams({
                  ...queryParams,
                  view: e.target.value,
                }).toString(),
              })
            }
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
        <div className="flex flex-col gap-10">
          {/* Overview */}
          <Table title={`${year} Race Result`}>
            <THead>
              <TRow>
                <THeading>Grand Prix</THeading>
                <THeading>Date</THeading>
                <THeading>Winner</THeading>
                <THeading>Car</THeading>
                <THeading>Laps</THeading>
                <THeading>Time</THeading>
              </TRow>
            </THead>
            <TBody>
              {data[year].races.map((race, index) => (
                <TRow key={index} actived={currentIndex === index}>
                  <TData onClick={handleClick("races", race.grandPrix)}>
                    {race.grandPrix}
                  </TData>
                  <TData>{race.date}</TData>
                  <TData onClick={handleClick("drivers", race.winner)}>
                    {race.winner}
                  </TData>
                  <TData onClick={handleClick("teams", race.car)}>
                    {race.car}
                  </TData>
                  <TData>{race.laps}</TData>
                  <TData>{race.time}</TData>
                </TRow>
              ))}
            </TBody>
          </Table>
          {/* Detail */}
          <Table title={data[year].races[currentIndex]?.raceResult.name}>
            <THead>
              <TRow>
                <THeading>POS</THeading>
                <THeading>No</THeading>
                <THeading>Driver</THeading>
                <THeading>Car</THeading>
                <THeading>Laps</THeading>
                <THeading>Time/Retired</THeading>
                <THeading>PTS</THeading>
              </TRow>
            </THead>
            <TBody>
              {data[year].races[currentIndex]?.raceResult.result.map(
                (race, index) => (
                  <TRow key={index}>
                    <TData>{race.pos}</TData>
                    <TData>{race.no}</TData>
                    <TData onClick={handleClick("drivers", race.driver)}>
                      {race.driver}
                    </TData>
                    <TData onClick={handleClick("teams", race.car)}>
                      {race.car}
                    </TData>
                    <TData>{race.lap}</TData>
                    <TData>{race.time}</TData>
                    <TData>{race.pts}</TData>
                  </TRow>
                )
              )}
            </TBody>
          </Table>
        </div>
      )}

      {/* Drivers */}
      {view === "drivers" && (
        <div className="flex flex-col gap-10">
          <Table title={`${year} Driver Standings`}>
            <THead>
              <TRow>
                <THeading>POS</THeading>
                <THeading>Driver</THeading>
                <THeading>Nationality</THeading>
                <THeading>Car</THeading>
                <THeading>PTS</THeading>
              </TRow>
            </THead>
            <TBody>
              {data[year].drivers.map((driver, index) => (
                <TRow key={index} actived={currentIndex === index}>
                  <TData>{driver.pos}</TData>
                  <TData onClick={handleClick("drivers", driver.driver)}>
                    {driver.driver}
                  </TData>
                  <TData>{driver.nationality}</TData>
                  <TData onClick={handleClick("teams", driver.car)}>
                    {driver.car}
                  </TData>
                  <TData>{driver.pts}</TData>
                </TRow>
              ))}
            </TBody>
          </Table>

          <Table
            title={`${year} Driver Standings: ${data[year].drivers[currentIndex]?.driver}`}
          >
            <THead>
              <TRow>
                <THeading>Grand Prix</THeading>
                <THeading>Date</THeading>
                <THeading>Car</THeading>
                <THeading>Race Position</THeading>
                <THeading>PTS</THeading>
              </TRow>
            </THead>
            <TBody>
              {data[year].drivers[currentIndex]?.driverResult.map(
                (driver, index) => (
                  <TRow key={index}>
                    <TData onClick={handleClick("races", driver.grandPrix)}>
                      {driver.grandPrix}
                    </TData>
                    <TData>{driver.date}</TData>
                    <TData onClick={handleClick("teams", driver.car)}>
                      {driver.car}
                    </TData>
                    <TData>{driver.racePosition ?? "DNF"}</TData>
                    <TData>{driver.pts}</TData>
                  </TRow>
                )
              )}
            </TBody>
          </Table>
        </div>
      )}

      {/* Teams */}
      {view === "teams" && (
        <div className="flex flex-col gap-10">
          <Line
            height={50}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Team postion from 1950 to 2023",
                },
              },
              maintainAspectRatio: true,
              scales: {
                y: {
                  reverse: true,
                  beginAtZero: true,
                  min: 0,
                  ticks: {
                    stepSize: 1,
                  },
                },
                x: {
                  ticks: {
                    callback(tickValue, index, ticks) {
                      return "";
                    },
                  },
                },
              },
            }}
            data={{
              labels: Object.keys(data),
              datasets: [
                {
                  data: Object.values(data).map((item) => {
                    const x = item.teams.find(
                      (i) => i.team === data[year].teams[currentIndex].team
                    );
                    return Number(x?.pos) || "";
                  }),
                  borderColor: "rgb(255, 99, 132)",
                  backgroundColor: "rgba(255, 99, 132, 0.5)",
                },
              ],
            }}
          />

          <Table title={`${year} Constructor Standings`}>
            <THead>
              <TRow>
                <THeading>POS</THeading>
                <THeading>Team</THeading>
                <THeading>PTS</THeading>
              </TRow>
            </THead>
            <TBody>
              {data[year].teams.map((team, index) => (
                <TRow
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  actived={currentIndex === index}
                >
                  <TData>{team.pos}</TData>
                  <TData onClick={handleClick("teams", team.team)}>
                    {team.team}
                  </TData>
                  <TData>{team.pts}</TData>
                </TRow>
              ))}
              {data[year].teams.length === 0 && (
                <TRow>
                  <TData colSpan={3} classNames="text-center">
                    The Constructors Championship was not awarded until{" "}
                    <b
                      className="cursor-pointer"
                      onClick={() => {
                        navigate({
                          search: createSearchParams({
                            year: "1958",
                            view: "teams",
                          }).toString(),
                        });
                      }}
                    >
                      1958
                    </b>
                  </TData>
                </TRow>
              )}
            </TBody>
          </Table>
          <Table
            title={`${year} Constructor Standings: ${data[year].teams[currentIndex]?.team}`}
          >
            <THead>
              <TRow>
                <THeading>Grand Prix</THeading>
                <THeading>Date</THeading>
                <THeading>PTS</THeading>
              </TRow>
            </THead>
            <TBody>
              {data[year].teams[currentIndex]?.teamResult.map((team, index) => (
                <TRow key={index}>
                  <TData onClick={handleClick("races", team.grandPrix)}>
                    {team.grandPrix}
                  </TData>
                  <TData>{team.date}</TData>
                  <TData>{team.pts}</TData>
                </TRow>
              ))}
            </TBody>
          </Table>
        </div>
      )}

      {/* DHL Fastest */}
      {view === "dhlFastestLaps" && (
        <Table title={`${year} DHL Fastest Lap Award`}>
          <THead>
            <TRow>
              <THeading>Grand Prix</THeading>
              <THeading>Driver</THeading>
              <THeading>Car</THeading>
              <THeading>Time</THeading>
            </TRow>
          </THead>
          <TBody>
            {data[year].dhlFastestLaps.map((dhl, index) => (
              <TRow key={index}>
                <TData>{dhl.grandPrix}</TData>
                <TData>{dhl.driver}</TData>
                <TData>{dhl.car}</TData>
                <TData>{dhl.time}</TData>
              </TRow>
            ))}
          </TBody>
        </Table>
      )}
    </main>
  );
}
