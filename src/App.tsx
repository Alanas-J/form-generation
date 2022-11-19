import './App.css';
import BasicInput from './components/BasicInput';
import FloatingInput from './components/FloatingInput';
import FormGenerator from './form-generation/FormGenerator';

const formGen = new FormGenerator();

formGen.sections = {
  userInfo: {
    next: 'additionalDetails',
    elements: [
      { 
        name: 'test_field',
        group: 'details',  
        label: 'Test Field',
        placeholder: 'Text goes here...', 
        component: BasicInput 
      },
      { 
        name: 'test_field2', 
        label: 'Test Field 2',
        placeholder: 'Text goes here...', 
        component: BasicInput
      },
      { 
        name: 'test_field3', 
        group: 'details',
        label: 'Test Field 3',
        placeholder: 'Text goes sdfgsdfgsdfg...', 
        component: BasicInput
      },
    ]
  },
  additionalDetails: {
    prev: 'userInfo',
    elements: [
      { name: 'test_field3', component: BasicInput },
    ]
  }  
};
formGen.startOn = 'userInfo';
const { FormComponent } = formGen.generate();

function App() {

  return (
    <div className="App">
      <h1>Header</h1>
        <FormComponent/>
      <h1>Footer</h1>
    </div>
  )
}

export default App
