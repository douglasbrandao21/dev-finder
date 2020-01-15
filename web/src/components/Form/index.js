import React, { useState, useEffect } from "react";

export default function Form({ onSubmit }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [github_username, setGithubUsename] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      error => {
        console.log(error);
      },
      {
        timeout: 3000
      }
    );
  }, []);

  async function Submit(event) {
    event.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    });

    setGithubUsename("");
    setTechs("");
  }

  return (
    <form onSubmit={Submit}>
      <div className="input-block">
        <label htmlFor="username_github">Usuário do GitHub</label>
        <input
          name="username_github"
          id="username_github"
          onChange={event => setGithubUsename(event.target.value)}
          value={github_username}
          required
        ></input>
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          name="techs"
          id="techs"
          onChange={event => setTechs(event.target.value)}
          value={techs}
          required
        ></input>
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            required
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
          ></input>
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            required
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
          ></input>
        </div>
      </div>
      <div className="button-container">
        <button type="submit">Salvar</button>
      </div>
    </form>
  );
}
