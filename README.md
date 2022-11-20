This is a proof of concept, both as an interesting project + a first go at Vite + Typescript
--
Form generation from object config.
This could potentially be a future library.

The idea behind this repo is to create a super flexible form framework where devs can create their own components and have state managed for them
with an event/callback interface to communicate with the generated form component.

If the form generation tool was a package itself, components could be a secondary package allowing for re-use and independent maintainability.
Additionally extra repo-specific components could be held on the repo itself.