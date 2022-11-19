import './App.css';
import BasicFieldDisplay from './components/BasicFieldDisplay';
import BasicInput from './components/BasicInput';
import Radio from './components/Radio';
import SectionTitle from './components/SectionTitle';
import StateDisplay from './components/StateDisplay';
import { isMandatory, checkRegex } from './components/validations';
import FormGenerator from './form-generation/FormGenerator';

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
        additionalProps: { label: 'Extra Field', placeholder: 'Text goes here...' }
      },
    ]
  },
  additionalDetails: {
    previous: 'userInfo',
    next: 'summary',
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
    ]
  },
  summary: {
    previous: 'additionalDetails',
    elements: [
      { 
        name: 'title',
        text: 'Summary',
        component: SectionTitle,
      },
      { name: 'name', group: 'details', component: BasicFieldDisplay },
      { name: 'email', group: 'details', component: BasicFieldDisplay },
      { name: 'extra', group: 'details', component: BasicFieldDisplay },
      { name: 'test_field4', component: BasicFieldDisplay },
      { name: 'state_display', component: StateDisplay },
    ]
  }  
};
formGen.startOn = 'userInfo';

formGen.onStep = (formState: any) => {
  console.log(`Stepped to ${formState._section}`, formState);
}


const { FormComponent, formAction } = formGen.generate();

function App() {

  return (
    <div className="App">
      <FormComponent/>
      <button onClick={() => formAction('previous')}>Back</button>
      <button onClick={() => formAction('next')}>Next</button>
      
    </div>
  )
}

export default App
