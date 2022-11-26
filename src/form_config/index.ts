import { FormConfiguration } from "../library/form-generation";
import user_info from "./pages/user_info";
import additional_details from "./pages/additional_details";
import file_upload from "./pages/file_upload";
import summary from "./pages/summary";
import { FormState } from "../library/form-generation/types";

const formConfig = new FormConfiguration();

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
formConfig.events.onFieldChange = (field: string, value: any, formState: any) => {
  console.log(`${field} set to '${value}'`, formState);
}

const { FormComponent, formAction } = formConfig.generate();
export { FormComponent, formAction, formConfig};