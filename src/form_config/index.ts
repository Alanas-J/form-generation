import FormGenerator from "../form-generation/FormGenerator";
import user_info from "./pages/user_info";
import additional_details from "./pages/additional_details";
import file_upload from "./pages/file_upload";
import summary from "./pages/summary";

const fg = new FormGenerator();

fg.sections = {
  user_info,
  additional_details,
  file_upload,
  summary
};

fg.startOn = 'user_info';
fg.onStep = (formState: any) => {
  console.log(`Stepped to ${formState._section}`, formState);
}
fg.onFieldChange = (message: string, formState: any) => {
    console.log(message, formState)
}

const { FormComponent, formAction } = fg.generate();
export { FormComponent, formAction};