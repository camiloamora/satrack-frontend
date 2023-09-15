import tasksApi from "../features/planning/api";

import { PRIORITY_TASK_QUANTITY } from "../features/planning/constants";
import PlanningContainer from "../features/planning/containers/PlanningContainer";

//const queryCache = new QueryCache()
export async function getStaticProps() {
  const tasks = await tasksApi.getAll();
  return { props: { tasks } };
}

function splitTask(tasks) {
  const priorityTask = tasks.slice(0, PRIORITY_TASK_QUANTITY);
  const backlogTasks = tasks.slice(PRIORITY_TASK_QUANTITY, tasks.length);

  return {
    priorityTask,
    backlogTasks,
  };
}

function Planning(props) {
  return (
    <>
      <PlanningContainer initialTasks={props.tasks} />
    </>
  );
}

export default Planning;
