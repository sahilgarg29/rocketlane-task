import React, { useEffect, useReducer, useState } from "react";
import CheckboxField from "../CheckboxField/CheckboxField";
import InputField from "../InputField";
import "./activites.css";
import axios from "../../axios/axios";
import activityReducer from "./activityReducer";
import { useChannel, useEvent } from "@harelpls/use-pusher";
import Activity from "../Activity";
import Loader from "../Loader";

const Activites = () => {
  const [projectName, setProjectName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [isBillable, setIsBillable] = useState(false);
  const [userId] = useState(1);
  const [activities, dispatch] = useReducer(activityReducer, []);
  const [isLoading, setIsLoading] = useState(false);

  const channel = useChannel("sahil-channel");
  useEvent(channel, "sahil-event", (activity) => {
    if (activities.find((e) => e.id === Number(activity.id))) {
      alert("Task already exists");
    } else {
      dispatch({ type: "ADD_ACTIVITY", payload: activity });
    }
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await axios.get("/");
      dispatch({ type: "ADD_ALL_ACTIVITES", payload: res.data });
      setIsLoading(false);
    })();
  }, []);

  const handleActivityDelete = (id) => {
    (async () => {
      try {
        setIsLoading(true);
        await axios.delete(`/${id}`);
        dispatch({ type: "DELETE_ACTIVITY", payload: id });
        setIsLoading(false);
      } catch (err) {
        if (err.response.status === 404) {
          dispatch({ type: "DELETE_ACTIVITY", payload: id });
        }
        setIsLoading(false);
      }
    })();
  };

  const handleDelete = (e) => {
    let delBtn = e.target.closest(".delete-button");

    if (delBtn) {
      handleActivityDelete(delBtn.dataset.id);
    }
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    (async () => {
      try {
        setIsLoading(true);
        let res = await axios.post("/", {
          taskName,
          projectName,
          isBillable,
          userId,
        });
        dispatch({
          type: "ADD_ACTIVITY",
          payload: { ...res.data, id: Date.now() },
        });
        setIsLoading(false);

        setProjectName("");
        setTaskName("");
        setIsBillable(false);
      } catch (error) {
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
            <form
              onSubmit={handleAddActivity}
              id="addActivityForm"
              autoComplete="off"
            >
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
          <h4>Team Tasks</h4>
        </div>
        <div className="activites__list">
          <div className="list" onClick={handleDelete}>
            {activities.map((activity) => (
              <Activity key={activity.id} activity={activity} userId={userId} />
            ))}
          </div>
        </div>
        <div className="acitvity__button-container">
          <button className="activity__button">Cancel</button>
          <input
            type="submit"
            form="addActivityForm"
            value="Add Activity"
            className="activity__button"
            disabled={
              projectName.trim().length > 0 && taskName.trim().length > 0
                ? false
                : true
            }
          />
        </div>
        {isLoading && <Loader />}
      </div>
    </>
  );
};

export default Activites;
