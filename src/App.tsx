
import './App.css';
import BasicInput from './components/BasicInput';
import FormGenerator from './form-generation/FormGenerator';

const formGen = new FormGenerator();

formGen.sections = {
  userInfo: {
    next: 'additionalDetails',
    elements: [
      { name: 'test_field', group: 'details', component: BasicInput },
      { name: 'test_field2', component: BasicInput },
      { name: 'test_field4', group: 'details', component: BasicInput },
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
