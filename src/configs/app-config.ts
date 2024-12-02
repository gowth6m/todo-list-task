export const AppConfig = {
  metadata: {
    title: 'Todo List App',
    description: 'A simple todo list app',
    version: import.meta.env.VITE_APP_VERSION,
  },
  assets: {
    appLogo: '/assets/logo.svg',
    appLogoTransparent: '/assets/logo_transparent.svg',
  },
  localStorageKeys: {
    store: 'todo-list-app-store',
    todos: 'todo-list-app-todos',
  },
  links: {
    landingPage: 'https://gowtham.io',
    github: 'https://github.com/gowth6m/todo-list-task',
  },
};
