import FormComponents from "../../components";
import { isMandatory, checkRegex } from "../../components/validations";
import { FormPage } from "../../library/form-generation/types";

const user_info = {
  next: 'additional_details',

  elements: [
    { 
      component: FormComponents.SectionTitle,
      componentProps: { text: 'Details' },
    },
    { 
      field: 'details.name',
      component: FormComponents.BasicInput,
      componentProps: { label: 'Name', placeholder: 'Enter your name...', name: 'name' },
      validations: [
        isMandatory('Please provide your name.')
      ]
    },
    { 
      field: 'details.email',
      component: FormComponents.BasicInput,
      componentProps: { label: 'Email', placeholder: 'Enter your email...', name: 'email' },
      validations: [
        isMandatory('Please provide your email.'),
        checkRegex('Please provide a valid email.', /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ]
    },
    { 
      field: 'details.showExtraField',
      defaultValue: 'No',
      component: FormComponents.Radio,
      componentProps: {
      label: 'Would you like to show the extra field?',
        options: ['Yes', 'No']
      }
    },
    { 
      field: 'details.extra',
      component: FormComponents.BasicInput,
      componentProps: { label: 'Extra Field', placeholder: 'Text goes here...' },
      showCondition: (formState: any) => (formState.details.showExtraField.value === 'Yes'),
      validations: [
        isMandatory('This extra field is mandatory.')
      ]
    },
  ]
};
export default user_info;