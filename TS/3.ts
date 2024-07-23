interface Todo {
  title: string;
  description: string;
}

// lib.es5.d.ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

