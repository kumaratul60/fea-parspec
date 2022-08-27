import { useState, useEffect, useMemo } from "react";

import "./App.css";

function App() {
  const [mockData, setMockData] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const mockJson = "https://www.mocky.io/v2/5ba8efb23100007200c2750c";

  useEffect(() => {
    const fetchMockData = async () => {
      const fetchData = await fetch(mockJson);
      const response = await fetchData.json();
      setMockData(response);
      setIsLoading(false);
      setInput(input);
      // console.log("🚀 response", response);
    };

    fetchMockData().catch((err) => console.log("error", err));

    return () => {
      clearTimeout(debouncedChangeHandler);
    };
  }, [input]);

  const debounceFn = (func, delay) => {
    let timer = 0;
    return (...args) => {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  // optimize search fn()
  const debouncedChangeHandler = useMemo(
    () => debounceFn(handleChange, 300),
    []
  );

  return (
    <div className="app">
      <input
        placeholder="Search users by ID, address, name..."
        onChange={debouncedChangeHandler}
      />
      {isLoading ? (
        <h3>Loading data...</h3>
      ) : (
        mockData
          .filter((item) => {
            if (input === "") {
              return null;
            } else if (item.name.toLowerCase().includes(input.toLowerCase())) {
              return item;
            }
          })
          .map((data, index) => (
            <div className="app__card" key={index}>
              <p>{<b>{data.id}</b>}</p>
              <span className="app__item">
                <p>{`Name: ${data.name}`}</p>
                <p>{`Address: ${data.address}`}</p>
              </span>
            </div>
          ))
      )}
    </div>
  );
}

export default App;
