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
        name: 'title',
        text: 'Details',
        component: SectionTitle,
      },
      { 
        name: 'name',
        group: 'details',  
        component: BasicInput,
        additionalProps: { label: 'Name', placeholder: 'Enter your name...' },
        validations: [
          isMandatory('Please provide your name.')
        ]
      },
      { 
        name: 'email',
        group: 'details', 
        component: BasicInput,
        additionalProps: { label: 'Email', placeholder: 'Enter your email...' },
        validations: [
          isMandatory('Please provide your email.'),
          checkRegex('Please provide a valid email.', /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ]
      },
      { 
        name: 'showExtraField', 
        group: 'details',
        defaultValue: 'No',
        component: Radio,
        additionalProps: {
          label: 'Would you like to show the extra field?',
          options: ['Yes', 'No']
        }
      },
      { 
        name: 'extra', 
        group: 'details',
        showCondition: (formState: any) => (formState.details.showExtraField.value === 'Yes'),
        component: BasicInput,
        additionalProps: { label: 'Extra Field', placeholder: 'Text goes here...' },
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
        name: 'title',
        text: 'Additional Details',
        component: SectionTitle,
      },
      { 
        name: 'test_field4',
        component: BasicInput,
        additionalProps: { label: 'Test Field', placeholder: 'Text goes here...' } 
      },
      {
        name: 'element_container',
        component: FieldRow,
        elements: [
          { 
            name: 'row_field1',
            component: BasicInput,
            additionalProps: { label: 'Row Field 1', placeholder: 'Recursive nesting :o' } 
          },
          { 
            name: 'row_field2',
            component: BasicInput,
            additionalProps: { label: 'Row Field 2', placeholder: 'Text goes here...' } 
          },
        ]
      },
      { 
        name: 'modal', 
        group: 'details',
        defaultValue: 'Extra Option',
        component: RadioModal,
        additionalProps: {
          label: 'This is a modal example, here are some options:',
          options: ['Yes', 'No','Extra Option']
        }
      },
    ]
  },
  fileUpload: {
    previous: 'additionalDetails',
    next: 'summary',
    elements: [
      { 
        name: 'title',
        text: 'File Uploading Example',
        component: SectionTitle,
      },
      {
        name: 'element_container',
        component: FieldRow,
        elements: [
          { 
            name: 'file_upload1',
            group: 'file_uploads',  
            component: FileInput,
            additionalProps: { label: 'Upload your file here' },
            validations: [
              isMandatory('You need to drop in a file here.')
            ]
          },
          { 
            name: 'file_upload2',
            group: 'file_uploads',  
            component: FileInput,
            additionalProps: { label: 'and here... (optional)' },
          },
        ]
      },
      { 
        name: 'modal', 
        group: 'details',
        defaultValue: 'Extra Option',
        component: RadioModal,
        additionalProps: {
          label: 'This is a modal example, here are some options:',
          options: ['Yes', 'No','Extra Option']
        }
      },
    ]
  },
  summary: {
    previous: 'fileUpload',
    elements: [
      { 
        name: 'title',
        text: 'Summary',
        component: SectionTitle,
      },
      { name: 'state_display', component: StateDisplay },
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