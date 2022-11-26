import { FormConfiguration } from "../form-generation";
import user_info from "./pages/user_info";
import additional_details from "./pages/additional_details";
import file_upload from "./pages/file_upload";
import summary from "./pages/summary";

const formConfig = new FormConfiguration();

formConfig.pages = {
  user_info,
  additional_details,
  file_upload,
  summary
};

formConfig.startOn = 'user_info';
formConfig.events.onStep = (formState: any) => {
  console.log(`Stepped to ${formState.currentPage}`, formState);
}
formConfig.events.onFieldChange = (message: string, formState: any) => {
    console.log(message, formState)
}

const { FormComponent, formAction } = formConfig.generate();
export { FormComponent, formAction, formConfig};