import FormComponents from "../../components";

const summary = {
  previous: 'fileUpload',
  
  elements: [
    { 
      component: FormComponents.SectionTitle,
      componentProps: { text: 'Summary' }
    },
    { component: FormComponents.StateDisplay },
  ]
};
export default summary;