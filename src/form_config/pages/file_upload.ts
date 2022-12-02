import FormComponents from '../../components';
import { isMandatory } from '../../components/validations';

const file_upload = {
  previous: 'additional_details',
  next: 'summary',

  elements: [
    { 
      component: FormComponents.SectionTitle,
      componentProps: { text: 'File Uploading Example' }
    },
    {
      component: FormComponents.FieldRow,
      elements: [
        { 
          field: 'file_uploads.file_upload1',
          component: FormComponents.FileInput,
          componentProps: { label: 'Upload your file here' },
          validations: [
            isMandatory('You need to drop in a file here.')
          ]
        },
        { 
          field: 'file_uploads.file_upload2',
          component: FormComponents.FileInput,
          componentProps: { label: 'and here... (optional)' },
        },
      ]
    }
  ]
};
export default file_upload;