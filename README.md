# [TodoMVC](https://todomvc.com/) implementation using Preact with [Supabase](https://supabase.io/) and [Firebase](https://firebase.google.com/) 
Two Preact demos, one utilising [Supabase](https://supabase.io/) and one using [Firebase](https://firebase.google.com/). The demos were built to "showcase" differences between Firebase (auth and Firestore) and Supabase.

## Usage
The Supabase implementation is available in the [supabase](supabase) directory (requires GitHub auth set up, have a look in [supabase/src/types/Todo.ts](supabase/src/types/Todo.ts) for table setup), the Firebase one in [firebase](firebase) (requires Firestore and GitHub auth set up). Instructions on developing, building and serving the projects can be found in their respective directory.

## Pre-built releases
Instead of building locally, you can download archives for the two demos from the [releases](https://github.com/EirikFA/supabase-firebase-todo/releases/latest) page. These versions are using my own Supabase and Firebase projects (no guarantees!) and can be served directly from an HTTP server.

## Live demos
The demos are available at [supabase.todo.arweb.no](https://supabase.todo.arweb.no) and [firebase.todo.arweb.no](https://firebase.todo.arweb.no).
