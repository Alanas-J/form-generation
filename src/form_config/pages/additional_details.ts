import FormComponents from "../../components";

const additional_details = {
  previous: 'user_info',
  next: 'file_upload',

  elements: [
    { 
      component: FormComponents.SectionTitle,
      componentProps: { text: 'Additional Details' }
    },
    { 
      field: 'additional_details.nested_once_more.test_field4',
      component: FormComponents.BasicInput,
      componentProps: { label: 'Test Field', placeholder: 'Text goes here...' } 
    },
    {
      component: FormComponents.FieldRow,
      elements: [
        { 
          field: 'additional.nestedoncemore.row_field1',
          component: FormComponents.BasicInput,
          componentProps: { label: 'Row Field 1', placeholder: 'Text goes here...' } 
        },
        { 
          field: 'details.row_field2',
          component: FormComponents.BasicInput,
          componentProps: { label: 'Row Field 2', placeholder: 'Text goes here...' } 
        },
      ]
    },
    { 
      field: 'additional_details.modal',
      defaultValue: 'Extra Option',
      component: FormComponents.RadioModal,
      componentProps: {
        label: 'This is a modal example, here are some options:',
        options: ['Yes', 'No', 'Extra Option']
      }
    },
  ]
};
export default additional_details;