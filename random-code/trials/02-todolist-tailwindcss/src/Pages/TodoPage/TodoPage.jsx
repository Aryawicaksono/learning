import React from "react";

import {
  StatWidget,
  TodoLayout,
  InputField,
  TaskList,
} from "@/Pages/TodoPage/components";
import { Button, Panel } from "@/components";

import { Task } from "@/models/Task";
import { Status, statuses } from "@/constants/segments";

import {
  IconClipBoard,
  IconLayout,
  IconPen,
  IconPlus,
  IconSquareCheck,
} from "@/components/icons";
import { SegmentedControl } from "@/components/SegmentedControl";
import { NoTasks } from "@/Pages/TodoPage/components/NoTasks";

export class TodoPage extends React.Component {
  state = {
    tasks: [
      new Task(1, "Implementasi halaman Register", false),
      new Task(2, "Build halaman Dashboard", false),
      new Task(3, "Komponen To-Do List", true),
    ],
    selectedIndex: 0,
    taskTitle: "",
    editedTitle: "",
  };

  handleAddTask = () => {
    const newTitle = this.state.taskTitle.trim();

    const newTask = new Task(Date.now(), newTitle, false);

    this.setState(({ tasks }) => ({
      tasks: [...tasks, newTask],
      taskTitle: "",
    }));
  };

  /**
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  handleInputChange = (event) => {
    event.preventDefault();
    const newTitle = event.target.value;
    this.setState(() => ({ taskTitle: newTitle }));
  };

  /**
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} event
   */
  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleAddTask();
    }
  };

  handleToggleTask = (taskId) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) =>
        taskId === task.id ? { ...task, isCompleted: !task.isCompleted } : task,
      ),
    }));
  };

  handleStartEdit = (currentTitle) => {
    this.setState({ editedTitle: currentTitle });
  };

  /**
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  handleEditChange = (event) => {
    this.setState({ editedTitle: event.target.value });
  };

  /**
   * @param {number} taskId
   */
  handleSaveEditTask = (taskId) => {
    const title = this.state.editedTitle.trim();

    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) =>
        taskId === task.id ? { ...task, title: title } : task,
      ),
      editedTitle: "",
    }));
  };

  /**
   * @param {number} taskId
   */
  handleDeleteTask = (taskId) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => task.id !== taskId),
    }));
  };

  /**
   *
   * @param {React.MouseEvent<HTMLButtonElement>} event
   */
  handleSelectSegment = (event) => {
    event.preventDefault();
    const index = Number(event.currentTarget.dataset.index);
    this.setState(() => ({ selectedIndex: index }));
  };

  get visibleTasks() {
    switch (this.state.selectedIndex) {
      case Status.ALL:
        return this.state.tasks;
      case Status.ACTIVE:
        return this.state.tasks.filter((task) => !task.isCompleted);
      case Status.COMPLETED:
        return this.state.tasks.filter((task) => task.isCompleted);
    }
  }

  render() {
    return (
      <TodoLayout className="mx-auto mt-10">
        <TodoLayout.Header className="flex flex-col gap-4.5">
          <h3 className="text-2xl font-semibold text-neutral-900">TodoList</h3>
          <section className="flex gap-1.5">
            <StatWidget
              className="from-purple-from to-purple-to text-purple-foreground flex-1 bg-linear-to-b"
              icon={<IconClipBoard color="#F2C7FF" />}
              label="Task"
              value={this.state.tasks.length}
            />
            <StatWidget
              className="from-blue-from to-blue-to text-blue-foreground flex-1 bg-linear-to-b"
              icon={<IconLayout color="#82D0FF" />}
              label="Active"
              value={
                this.state.tasks.filter((task) => !task.isCompleted).length
              }
            />
            <StatWidget
              className="from-green-from to-green-to text-green-foreground flex-1 bg-linear-to-b"
              icon={<IconSquareCheck color="#D8F4D6" />}
              label="Done"
              value={this.state.tasks.filter((task) => task.isCompleted).length}
            />
          </section>
        </TodoLayout.Header>
        <TodoLayout.Input className="flex items-center justify-between gap-2">
          <InputField
            className="flex-1"
            icon={<IconPen color="#4A4A4A" />}
            value={this.state.taskTitle}
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
          />
          <Button
            className="flex items-center gap-1.5"
            onClick={this.handleAddTask}
          >
            <IconPlus color="#FFFFFF" />
            <span>Add</span>
          </Button>
        </TodoLayout.Input>
        <TodoLayout.Body>
          <Panel>
            <Panel.Header>
              <SegmentedControl
                segments={statuses}
                selectedIndex={this.state.selectedIndex}
                onSelectedSegment={this.handleSelectSegment}
              />
            </Panel.Header>
            <Panel.Body>
              {this.state.tasks.length === 0 ? (
                <div className="flex h-90 items-center justify-center">
                  <NoTasks />
                </div>
              ) : (
                <TaskList
                  tasks={this.visibleTasks}
                  editedTitle={this.state.editedTitle}
                  onToggleTask={this.handleToggleTask}
                  onStartEdit={this.handleStartEdit}
                  onChange={this.handleEditChange}
                  onSaveEditTask={this.handleSaveEditTask}
                  onDeleteTask={this.handleDeleteTask}
                />
              )}
            </Panel.Body>
          </Panel>
        </TodoLayout.Body>
      </TodoLayout>
    );
  }
}
