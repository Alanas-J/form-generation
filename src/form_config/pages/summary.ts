import FormComponents from "../../components";

const summary = {
  previous: 'file_upload',
  submit: true,
  
  elements: [
    { 
      component: FormComponents.SectionTitle,
      componentProps: { text: 'Summary' }
    },
    { component: FormComponents.StateDisplay },
  ]
};
export default summary;