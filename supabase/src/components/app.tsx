import { Session } from "@supabase/supabase-js";
import { createContext, FunctionalComponent, h } from "preact";
import { Route, Router } from "preact-router";
import { useEffect, useState } from "preact/hooks";

import { auth } from "../api";
import Todos from "../routes/todos";

export const SessionContext = createContext<Session | null>(null);

const App: FunctionalComponent = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(auth.session());
    const { data } = auth.onAuthStateChange((_event, newSession) => setSession(newSession));

    return () => data?.unsubscribe();
  }, []);

  return (
    <div id="app">
      <SessionContext.Provider value={session}>
        <Router>
          <Route path="/" component={Todos} />
        </Router>
      </SessionContext.Provider>
    </div>
  );
};

export default App;
