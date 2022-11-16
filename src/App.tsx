import './App.css';

class FormGen {
  components: Array<JSX.Element> = [];
  fields: any;

  generate(){
    return () => (
    <div>
      { 
        this.fields.map((field: any) => {
          const component = {...this.components.find(component => component.type.name == field.component)};

          component.props = { name: field.name };

          return component
        })
      }
    </div>
    )
  }
}

const formGen = new FormGen()
formGen.components = [<BasicInput/>];
formGen.fields = [
  { name: 'test_field', component: 'BasicInput' },
  { name: 'test_field2', component: 'BasicInput' }
];

function App() {


  const FormComponent = formGen.generate();

  return (
    <div className="App">
      <h1>Header</h1>
        <FormComponent/>
      <h1>Footer</h1>
    </div>
  )
}

export default App

function BasicInput({ name }: any) {
  return (
    <input type="text" name={name} placeholder={name} />
  )
}