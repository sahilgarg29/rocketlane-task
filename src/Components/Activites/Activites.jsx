import React, { useEffect, useReducer, useState } from "react";
import CheckboxField from "../CheckboxField/CheckboxField";
import InputField from "../InputField";
import "./activites.css";
import axios from "../../axios/axios";
import activityReducer from "./activityReducer";
import { useChannel, useEvent } from "@harelpls/use-pusher";

import Task from "../Task";

const Activites = () => {
  const [projectName, setProjectName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [isBillable, setIsBillable] = useState(false);
  const [userId, setUserId] = useState(1);
  const [activities, dispatch] = useReducer(activityReducer, []);
  const [isLoading, setIsLoading] = useState(false);

  const channel = useChannel("my-channel");
  useEvent(channel, "my-event", (activity) => {
    dispatch({ type: "ADD_ACTIVITY", payload: activity });
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await axios.get("/");
      console.log(res.data);
      dispatch({ type: "ADD_ALL_ACTIVITES", payload: res.data });
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    console.log(activities);
  });

  const handleActivityDelete = (id) => {
    (async () => {
      try {
        setIsLoading(true);

        let res = await axios.delete(`/${id}`);
        console.log(id);
        dispatch({ type: "DELETE_ACTIVITY", payload: id });
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        if (err.response.status == 404) {
          dispatch({ type: "DELETE_ACTIVITY", payload: id });
        }
        setIsLoading(false);
      }
    })();
  };

  const handleAddActivity = () => {
    (async () => {
      try {
        setIsLoading(true);
        let res = await axios.post("/", {
          taskName,
          projectName,
          isBillable,
          userId,
        });
        console.log(res);
        dispatch({
          type: "ADD_ACTIVITY",
          payload: { ...res.data, id: Date.now() },
        });
        setIsLoading(false);

        setProjectName("");
        setTaskName("");
        setIsBillable(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    })();
  };

  return (
    <>
      <div className="activites">
        <div className="activities__top">
          <div className="activites__header">
            <h3>Activites</h3>
          </div>
          <div className="activites_input">
            <form>
              <InputField
                text={projectName}
                setText={setProjectName}
                isRequired
                name="Project Name"
                placeHolder="Eg. Nike Implementation"
              />
              <div className="flex" style={{ marginTop: "36px" }}>
                <div className="flex-grow">
                  <InputField
                    text={taskName}
                    setText={setTaskName}
                    isRequired
                    name="Task Name"
                    placeHolder="Eg. Kick-off call"
                  />
                </div>
                <CheckboxField
                  name="Billable"
                  isChecked={isBillable}
                  isRequired={false}
                  toggleChecked={setIsBillable}
                />
              </div>
            </form>
          </div>
          {/* <div className="activites__list-buttons-container"> */}
          <h4>Team Tasks</h4>
        </div>
        <div className="activites__list">
          <div className="list">
            {activities.map((activity) => (
              <Task
                key={activity.id}
                activity={activity}
                userId={userId}
                onDelete={handleActivityDelete}
              />
            ))}
          </div>
        </div>
        <div className="acitvity__button-container">
          <button className="activity__button">Cancel</button>
          <button
            className="activity__button"
            disabled={
              projectName.trim().length > 0 && taskName.trim().length > 0
                ? false
                : true
            }
            onClick={handleAddActivity}
          >
            Add activity
          </button>
        </div>
        {/* </div> */}
        {isLoading && (
          <div className="loading">
            <div class="loader"></div>
            <p>Loading...</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Activites;