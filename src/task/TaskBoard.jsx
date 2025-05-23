import { useState } from "react";
import AddaskModal from "./AddaskModal";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";

function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Web Development",
    description: "I want to learn web development and build my own website.",
    tags: ["HTML", "CSS", "JavaScript"],
    priority: "Low",
    isFavorite: false,
  };
  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const handleAddTask = (task, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, task]);
    } else {
      setTasks(
        tasks.map((t) => {
          if (t.id === task.id) {
            return task;
          }
          return t;
        })
      );
    }

    setShowAddModal(false);
  };

  const handleCloseClick = () => {
    setShowAddModal(false);
    setEditTask(null);
  };

  const handleEdit = (etask) => {
    setEditTask(etask);
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleFav = (id) => {
    const taskIndex = tasks.findIndex((t) => t.id === id);
    const newTasks = [...tasks];
    newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;
    setTasks(newTasks);
  };

  const handleSearch = (search) => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
    setTasks([...filtered]);
  };

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddaskModal
          onSave={handleAddTask}
          task={editTask}
          onCloseClick={handleCloseClick}
        />
      )}
      <div className="container">
        {/* <!-- Search Box --> */}
        <SearchTask onSearch={handleSearch} />

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            onAddTask={() => setShowAddModal(true)}
            className="absolute top-10 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-all z-20"
            onDelete={() => setTasks([])}
          />
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onFav={handleFav}
            />
          ) : (
            <p className="text-center text-white font-semibold">
              No Task Found
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default TaskBoard;
