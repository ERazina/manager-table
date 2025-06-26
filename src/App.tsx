import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "./components/Table/Table";
import { Buttons } from "./components/Buttons";
import "./App.css";

function App() {
  const url = "https://3snet.co/js_test/api.json";
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async (url: string) => {
      try {
        const response = await axios.get(url);
        const data = await response.data;
        console.log(data);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(url);
  }, []);

  return (
    <>
      <Buttons />
      <Table />
    </>
  );
}

export default App;
