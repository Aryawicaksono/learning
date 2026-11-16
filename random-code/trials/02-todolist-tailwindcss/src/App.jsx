import React from "react";
import { TodoPage } from "@/Pages/TodoPage";
import { NoTasks } from "@/Pages/TodoPage/components/NoTasks";

export class App extends React.Component {
  render() {
    return (
      <div>
        <TodoPage />
      </div>
    );
  }
}
