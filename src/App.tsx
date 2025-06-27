// import { useEffect } from "react";
import { Table } from "./components/Table/Table";
import { Buttons } from "./components/Buttons";
// import { dataStore } from "./store/dataStore";
import "./App.css";

function App() {
  // const {isLoading, error, fetchData } = dataStore();

  // const loading = isLoading && <div>Loading...</div>;

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  return (
    <>
      <Buttons />
      {/* {isLoading ? loading : <Table />} */}
      {/* {error && <div className="error">{error}</div>} */}
      <Table />
    </>
  );
}

export default App;
