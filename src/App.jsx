import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ProjectsSidebar from "./Components/Projects Sidebar/ProjectsSidebar";
import NewProject from "./Components/New Project/NewProject";
import NoProjectSelected from "./Components/No Project Selected/NoProjectSelected";
import SelectedProject from "./Components/Selected Project/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("projectsData")) || [];

    if (Array.isArray(storedData) && storedData.length > 0) {
      const latestData = storedData[0];
      setProjectsState({
        selectedProjectId: latestData.selectedProjectId,
        projects: latestData.projects || [],
      });
    }
  }, []);

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const taskId = uuidv4();
      const newTask = {
        text: text,
        id: taskId,
      };

      // Create a copy of the current project
      const updatedProjects = prevState.projects.map((project) => {
        if (project.id === prevState.selectedProjectId) {
          return {
            ...project,
            tasks: [...project.tasks, newTask],
          };
        }
        return project;
      });

      // Update local storage with the new task
      updateLocalStorage({
        ...prevState,
        projects: updatedProjects,
      });

      return {
        ...prevState,
        projects: updatedProjects,
      };
    });
  }

  function handleDeleteTask(projectId, taskId) {
    setProjectsState((prevState) => {
      // Create a copy of the current project
      const updatedProjects = prevState.projects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            tasks: project.tasks.filter((task) => task.id !== taskId),
          };
        }
        return project;
      });

      // Update local storage without the deleted task
      updateLocalStorage({
        ...prevState,
        projects: updatedProjects,
      });

      return {
        ...prevState,
        projects: updatedProjects,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    });
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const projectId = uuidv4();
      const newProject = {
        ...projectData,
        id: projectId,
        tasks: [], // Initialize tasks as an empty array for the new project
      };

      const updatedProjects = [...prevState.projects, newProject];

      // Update local storage with the new projects
      updateLocalStorage({
        ...prevState,
        projects: updatedProjects,
      });

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: updatedProjects,
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      // Filter out the deleted project
      const updatedProjects = prevState.projects.filter(
        (project) => project.id !== prevState.selectedProjectId
      );

      // Update local storage without the deleted project
      updateLocalStorage({
        ...prevState,
        selectedProjectId: undefined,
        projects: updatedProjects,
      });

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: updatedProjects,
      };
    });
  }

  function updateLocalStorage(data) {
    // Update local storage with the latest state
    localStorage.setItem("projectsData", JSON.stringify([data]));
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={selectedProject ? selectedProject.tasks : []}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
