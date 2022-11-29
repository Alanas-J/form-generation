import { FormConfiguration } from "../library/form-generation/FormGeneration";
import user_info from "./pages/user_info";
import additional_details from "./pages/additional_details";
import file_upload from "./pages/file_upload";
import summary from "./pages/summary";
import { FormState } from "../library/form-generation/types";
import FormComponents from "../components";

const formConfig = new FormConfiguration();

formConfig.rootComponent = FormComponents.RootComponent; 

formConfig.pages = {
  user_info,
  additional_details,
  file_upload,
  summary
};

formConfig.startOn = 'user_info';
formConfig.events.onStep = (currentPage: string, formState: FormState) => {
  console.log(`Stepped to '${currentPage}'`, formState);
}
formConfig.events.onFieldChange = (field: string, value: any, formState: FormState) => {
  console.log(`${field} set to '${value}'`, formState);
}
formConfig.events.onSubmit = (formValues) => {
  console.log('Form Submitted', formValues);
}

formConfig.events.onSubmit = (formValues, dispatchFormAction) => {
  console.log('Form Submitted', formValues);

  dispatchFormAction({type: 'go-back'});

  setTimeout(() => dispatchFormAction({type: 'go-back'}), 1000)
}
export default formConfig.generate();
