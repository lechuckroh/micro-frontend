import React, { useEffect, useState } from "react";
import "./App.css";

// -----------------------------------------------------------------

interface RegionsProps {
  id: string;
  regions: string[];
}

function Regions(props: RegionsProps) {
  const options = [
    { value: "", text: "Select region.." },
    ...props.regions.map((region) => ({ value: region, text: region })),
  ];

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(`changed to ${event.target.value}`);
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

function App() {
  const [regions, setRegions] = useState<string[] | null>(null);

  const fetchRegions = () => {
    setRegions(null);
    setTimeout(() => {
      setRegions(["Korea", "US"]);
    }, 2000);
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
        <Regions id="regions" regions={regions} />
      ) : (
        <div>Loading..</div>
      )}
    </div>
  );
}

export default App;
