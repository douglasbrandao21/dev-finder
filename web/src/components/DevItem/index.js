import React from "react";

import "./styles.css";

export default function DevItem({ dev, removeDev }) {
  function removeItem() {
    removeDev(dev._id);
  }

  return (
    <li className="dev-item">
      <div>
        <header>
          <img src={dev.avatar_url} alt="profile-pic" />
          <div className="user-info">
            <strong>{dev.name}</strong>
            <span>{dev.techs.join(", ")}</span>
          </div>
        </header>
        <p>{dev.bio}</p>
      </div>

      <div className="item-footer">
        <a href={`https://github.com/${dev.github_username}`}>
          <i className="fab fa-github"></i>
          <p>Acessar Github</p>
        </a>

        <a href="." onClick={removeItem}>
          <i className="fas fa-trash-alt"></i>
          <p>Excluir</p>
        </a>
      </div>
    </li>
  );
}
