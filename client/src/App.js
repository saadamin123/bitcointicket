import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [createProjectModal, setCreateProjectModal] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    // body: JSON.stringify({
    //   tagName: tagName,
    //   tagId: tagId,
    //   parentTagId: parentTagId ? parentTagId.value : null,
    // }),

    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("/api/", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result.data))
      .catch((error) => console.log("error", error));
  };

  return <div className="App"></div>;
}

export default App;
