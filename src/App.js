import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories')
      .then(response => setRepositories(response.data))
  }, [repositories])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Alan Alves",
      url: "https://github.com/alanalv3s",
      techs: ["React", "NodeJS", "React Native"]
    })

    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const newRepos = repositories.filter(repository => repository.id !== id)

    setRepositories(newRepos)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            <a href={repository.url} target="_blank">{repository.title}</a>

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
