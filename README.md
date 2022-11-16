This is a proof of concept, both as an interesting project + a first go at Vite + Typescript
--
Form generation from object config.
It will generate a FormComponent

This could potentially be a future library.

const form = new FormLibrary();
form.initialPage()
form.addPage()
form.submission()
form.values
form.fieldComponents()

const FormComponent = form.generate()
