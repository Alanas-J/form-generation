import './App.css';
import BasicFieldDisplay from './components/BasicFieldDisplay';
import BasicInput from './components/BasicInput';
import SectionTitle from './components/SectionTitle';
import { isMandatory } from './components/validations';
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
      },
      { 
        name: 'extra', 
        group: 'details',
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
