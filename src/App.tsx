
import './App.css';
import BasicInput from './components/BasicInput';
import FormGenerator from './form-generation/FormGenerator';

const formGen = new FormGenerator();
formGen.formElements = [
  { name: 'test_field', component: BasicInput },
  { name: 'test_field2', component: BasicInput }
];

function App() {


  const { FormComponent } = formGen.generate();

  return (
    <div className="App">
      <h1>Header</h1>
        <FormComponent/>
      <h1>Footer</h1>
    </div>
  )
}

export default App
