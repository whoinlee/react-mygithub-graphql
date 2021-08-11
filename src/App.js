import { useEffect, useState } from 'react';
//-- Components
import RepoInfo from './components/RepoInfo';
//
import github from './data/db';
import query from './data/Query';
/*
const github = {
    baseURL: "https://api.github.com/graphql",
    username: [username],
    headers: {
        "Content-Type": "application/json",
        Authorization: "bearer [hidden token...]"
    }
};
*/


function App() {
  const [userName, setUserName] = useState("");
  const [repoList, setRepoList] = useState([]);

  useEffect(() => {
    
    const fetchData = async() => {
      console.log("App :: fetchData called ==========> how many times??");
      const res = await fetch(github.baseURL, {
        method: "POST",
        headers: github.headers,
        body: JSON.stringify(query),
      });
      const data = (await res.json()).data;
      const viewer = data.viewer;
      const search = data.search;
      setUserName(viewer.name);
      setRepoList(search.nodes);
    };//fetchData
    fetchData();
  }, []);

  return (
    <div className="App container mt-5">
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill" /> Repos
      </h1>
      <p>Hey there, {userName}</p>
      {repoList && (
        <ul className="list-group list-group-flush">
          {repoList.map(repo => 
           <RepoInfo repo={repo} key={repo.id}/>
          )}
        </ul>
      )}
    </div>
  );
};

export default App;
