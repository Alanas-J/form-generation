import BasicFieldDisplay from './components/BasicFieldDisplay';
import BasicInput from './components/BasicInput';
import Radio from './components/Radio';
import RadioModal from './components/RadioModal';
import SectionTitle from './components/SectionTitle';
import StateDisplay from './components/StateDisplay';
import FieldRow from './components/containers/FieldRow';
import { isMandatory, checkRegex } from './components/validations';
import FormGenerator from './form-generation/FormGenerator';
import FileInput from './components/FileInput';

const formGen = new FormGenerator();

formGen.sections = {
  userInfo: {
    next: 'additionalDetails',
    elements: [
      { 
        component: SectionTitle,
        componentProps: { text: 'Details' },
      },
      { 
        field: 'details.name',
        component: BasicInput,
        componentProps: { label: 'Name', placeholder: 'Enter your name...', name: 'name' },
        validations: [
          isMandatory('Please provide your name.')
        ]
      },
      { 
        field: 'details.email',
        component: BasicInput,
        componentProps: { label: 'Email', placeholder: 'Enter your email...', name: 'email' },
        validations: [
          isMandatory('Please provide your email.'),
          checkRegex('Please provide a valid email.', /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ]
      },
      { 
        field: 'details.showExtraField',
        group: 'details',
        defaultValue: 'No',
        component: Radio,
        componentProps: {
          label: 'Would you like to show the extra field?',
          options: ['Yes', 'No']
        }
      },
      { 
        field: 'details.extra',
        showCondition: (formState: any) => (formState.details.showExtraField.value === 'Yes'),
        component: BasicInput,
        componentProps: { label: 'Extra Field', placeholder: 'Text goes here...' },
        validations: [
          isMandatory('This extra field is mandatory.')
        ]
      },
    ]
  },
  additionalDetails: {
    previous: 'userInfo',
    next: 'fileUpload',
    elements: [
      { 
        component: SectionTitle,
        componentProps: { text: 'Additional Details' }
      },
      { 
        field: 'additional_details.nested_once_more.test_field4',
        component: BasicInput,
        componentProps: { label: 'Test Field', placeholder: 'Text goes here...' } 
      },
      {
        name: 'element_container',
        component: FieldRow,
        elements: [
          { 
            field: 'additional.nestedoncemore.row_field1',
            component: BasicInput,
            componentProps: { label: 'Row Field 1', placeholder: 'Text goes here...' } 
          },
          { 
            field: 'details.row_field2',
            component: BasicInput,
            componentProps: { label: 'Row Field 2', placeholder: 'Text goes here...' } 
          },
        ]
      },
      { 
        field: 'additional_details.modal',
        defaultValue: 'Extra Option',
        component: RadioModal,
        componentProps: {
          label: 'This is a modal example, here are some options:',
          options: ['Yes', 'No', 'Extra Option']
        }
      },
    ]
  },
  fileUpload: {
    previous: 'additionalDetails',
    next: 'summary',
    elements: [
      { 
        component: SectionTitle,
        componentProps: { text: 'File Uploading Example' }
      },
      {
        component: FieldRow,
        elements: [
          { 
            field: 'file_uploads.file_upload1',
            component: FileInput,
            componentProps: { label: 'Upload your file here' },
            validations: [
              isMandatory('You need to drop in a file here.')
            ]
          },
          { 
            field: 'file_uploads.file_upload2',
            component: FileInput,
            componentProps: { label: 'and here... (optional)' },
          },
        ]
      }
    ]
  },
  summary: {
    previous: 'fileUpload',
    elements: [
      { 
        component: SectionTitle,
        componentProps: { text: 'Summary' }
      },
      { component: StateDisplay },
    ]
  }  
};

formGen.startOn = 'userInfo';
formGen.onStep = (formState: any) => {
  console.log(`Stepped to ${formState._section}`, formState);
}
formGen.onFieldChange = (message: string, formState: any) => {
    console.log(message, formState)
}

const { FormComponent, formAction } = formGen.generate();
export { FormComponent, formAction};