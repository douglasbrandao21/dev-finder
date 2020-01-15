import React, { useEffect, useState } from "react";

import api from "./services/api";

import DevItem from "./components/DevItem";
import Form from "./components/Form";

import "./Global.css";
import "./Container.css";
import "./Sidebar.css";
import "./Main.css";

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");

      setDevs(response.data);
    }
    loadDevs();
  }, [devs]);

  async function Submit(data) {
    const response = await api.post("/devs", data);

    setDevs([...devs, response.data]);
  }

  async function removeDev(id) {
    await api.get(`/devs/${id}`);

    setDevs([...devs]);
  }

  return (
    <div id="container">
      <aside>
        <div>
          <strong>Cadastrar</strong>
          <Form onSubmit={Submit}></Form>
        </div>
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} removeDev={removeDev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
