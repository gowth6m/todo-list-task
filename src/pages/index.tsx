import { Helmet } from 'react-helmet-async';

import TodoListView from 'src/components/todo-list/todo-list-view';

// ----------------------------------------------------------------------

export default function IndexPage() {
  return (
    <>
      <Helmet>
        <title>Todo List</title>
      </Helmet>

      <TodoListView />
    </>
  );
}
