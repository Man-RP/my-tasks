import React, { useState } from "react";
import styles from "./NewTask.module.css";

const NewTask = (props) => {
  const { sandData } = props;
  const [taskValue, setTaskValue] = useState();

  const handleSubmit = () => {
    sandData(taskValue);
  };

  const handleChange = (event) => {
    setTaskValue(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Add New Task</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          value={taskValue}
          onChange={handleChange}
        />
        <input className={styles.submit} type="submit" value="ADD" />
      </form>
    </div>
  );
};

export default NewTask;
