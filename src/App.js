import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [mockData, setMockData] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMockData = async () => {
      const fetchData = await fetch(
        "http://www.mocky.io/v2/5ba8efb23100007200c2750c"
      );
      const response = await fetchData.json();
      setMockData(response);
      setIsLoading(false);
      console.log("🚀 response", response);
    };
    fetchMockData().catch((err) => console.log("error", err));
  }, [input]);

  const onSubmitChange = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      alert("please type name/id");
      return;
    }

    setInput("");
  };

  return (
    <div className="app">
      <input
        placeholder="Search users by ID, address, name..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      {isLoading ? (
        <h3>Loading data...</h3>
      ) : (
        mockData
          .filter((item) => {
            if (input === "") {
              return null;
            } else if (item.name.toLowerCase().includes(input.toLowerCase())) {
              return { item };
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
