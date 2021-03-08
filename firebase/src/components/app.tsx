import { createContext, FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";
import { useEffect, useState } from "preact/hooks";

import { auth, firebase } from "../api";
import Todos from "../routes/todos";

export const UserContext = createContext<firebase.User | null>(null);

const App: FunctionalComponent = () => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(newUser => setUser(newUser));

    return () => unsubscribe();
  }, []);

  return (
    <div id="app">
      <UserContext.Provider value={user}>
        <Router>
          <Route path="/" component={Todos} />
        </Router>
      </UserContext.Provider>
    </div>
  );
};

export default App;
