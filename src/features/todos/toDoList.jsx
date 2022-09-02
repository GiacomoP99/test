import { useQuery, useMutation, useQueryClient } from "react-query";
import { getToDos, updateToDo, deleteToDo, addToDo } from "../../api/toDoApi";
import { useState } from "react";

const ToDoList = () => {
  const [newToDo, setNewToDo] = useState("");
  const queryClient = useQueryClient();
  const { isLoading, isError, error, data: todos } = useQuery(
    "todos",
    getToDos
  );
  const addToDoMutation = useMutation(addToDo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    }
  });
  const updateToDoMutation = useMutation(updateToDo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    }
  });
  const deleteToDoMutation = useMutation(deleteToDo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addToDoMutation.mutate({ userId: 1, title: newToDo, completed: false });
    setNewToDo("");
  };

  let content;
  if (isLoading) {
    content = <p>Loading</p>;
  } else if (isError) {
    content = <p>error</p>;
  } else {
    content = <p>{JSON.stringify(todos)}</p>;
  }

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <div>
        <input value={newToDo} onChange={(e) => setNewToDo(e.target.value)} />
      </div>
      <button>submit</button>
    </form>
  );

  return (
    <div>
      {newItemSection}
      <div>{content}</div>
    </div>
  );
};

export default ToDoList;
