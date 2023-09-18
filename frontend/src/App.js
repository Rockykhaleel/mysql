import "./App.css";
import { useState, useEffect } from "react";

function App() {
  // Define state variables for the list of tasks, task ID, and task name
  const [data, setData] = useState([]);
  const [task_id, settask_id] = useState("");
  const [task_name, settask_name] = useState("");

  // Generate a random task ID when the component mounts
  useEffect(() => {
    let rand = Math.floor(Math.random() * 100 + 1);
    let torand = rand.toString();
    console.log(torand);
    settask_id(torand);
  }, []);

  // Fetch the list of tasks from the server when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/task", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      setData(json);
    };
    fetchData();
  }, []);

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:5000/task/${id}`, {
        method: "DELETE",
      });
      setData(data.filter((task) => task.id_tasks !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  // Handle form submission by sending a POST request to the server
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { task_id, task_name };
      await fetch("http://localhost:5000/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  // Render the form and list of tasks
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="text-center bg-random">
            <h1>To Do List APP:</h1>
            <form onSubmit={onSubmitForm}>
              <label className="form-label">Task Name :</label>
              <input
                type="text"
                className="form-control inp asd"
                onChange={(e) => settask_name(e.target.value)}
                value={task_name}
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary"
              ></input>
            </form>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <ul>
            {data.map(
              (
                item,
                index //all the data from api is being displayed here
              ) => (
                <li key={index}>
                  {item.task_name}
                  <button
                    className="button-right"
                    onClick={() => deleteTask(item.id_tasks)}
                  >
                    X
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
