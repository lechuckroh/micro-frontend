import React, {useEffect, useState} from "react";
import "./App.css";
import {BrowserHistory, createBrowserHistory} from "history";

// -----------------------------------------------------------------

interface RegionsProps {
  id: string;
  regions: string[];
  history: BrowserHistory;
}

function Regions(props: RegionsProps) {
  const options = [
    {value: "", text: "Select region.."},
    ...props.regions.map((region) => ({value: region, text: region})),
  ];

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = event.target.value;
    props.history.push(`/region/${selected.toLocaleLowerCase()}`);
  };

  return (
    <select id={props.id} onChange={onChange}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
}

// -----------------------------------------------------------------

const defaultHistory = createBrowserHistory();

function App({history = defaultHistory}) {
  const [regions, setRegions] = useState<string[] | null>(null);

  const fetchRegions = () => {
    setRegions(null);
    setTimeout(() => {
      setRegions(["Korea", "US"]);
    }, 1000);
  };

  useEffect(() => {
    if (regions == null) {
      fetchRegions();
    }
  });

  return (
    <div>
      <h3>Regions</h3>
      <div>
        <button onClick={() => fetchRegions()}>Refresh</button>
      </div>
      {regions ? (
        <Regions id="regions" regions={regions} history={history}/>
      ) : (
        <div>Loading..</div>
      )}
    </div>
  );
}

export default App;
