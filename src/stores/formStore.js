// store sur les formulaire
import { defineStore } from "pinia";
export const useFormStore = defineStore("formStore", {
  state: () => ({
    formFields: [],
    field: {},
    element: {},
    data: [],
    test: "test",
    forms: JSON.parse(localStorage.getItem("forms")) || [],
    formName: "",
    formDescription: "",
    preview: false,
    currentForm: null,
    allData:JSON.parse(localStorage.getItem("allData")) || [],
    editForm: false,
    editData: false,
  }),
  actions: {
    addField({ fieldName, fieldType, fieldValue }) {
      this.formFields.push({
        fieldName,
        fieldType,
        fieldValue,
        fieldplaceholder,
      });
    },
    addElement({ elementName, elementValue }) {
      this.element = { elementName, elementValue };
      this.data.push(this.element);
    },
    createForm() {
      let forms = JSON.parse(localStorage.getItem("forms")) || [];
      forms.push({
        formName: this.formName,
        formDescription: this.formDescription,
        formFields: this.formFields,
      });
      localStorage.setItem("forms", JSON.stringify(forms));
      this.forms = JSON.parse(localStorage.getItem("forms")) || [];
      this.resetForm();
    },
    editFormFields(element){
        this.editForm = true;
        this.currentForm = this.forms.find((form) => form.formName === element.name);
        this.formName = this.currentForm.formName;
        this.formDescription = this.currentForm.formDescription;
        this.formFields = [...this.currentForm.formFields];
    },
    updateForm(){
        this.forms = this.forms.map((form) => {
            if(form.formName === this.currentForm.formName){
                form.formName = this.formName;
                form.formDescription = this.formDescription;
                form.formFields = [...this.formFields];
            }
            return form;
        });
        localStorage.setItem("forms", JSON.stringify(this.forms));
        this.editForm = false;
    },
    deleteForm(element){
        this.forms = this.forms.filter((form) => form.formName !== element.name);
        localStorage.setItem("forms", JSON.stringify(this.forms));
        //remove all data related to the form
        this.allData = this.allData.filter((data) => data.formName !== element.name);
        localStorage.setItem("allData", JSON.stringify(this.allData));
        this.resetForm();
    },
    resetForm() {
      this.formFields = [];
      this.field = {};
      this.element = {};
      this.data = [];
      this.formName = "";
      this.formDescription = "";
      this.preview = false;
    },
    getFieldsInfo(fields) {
      return fields.map(({ formName, formDescription }) => ({
        name: formName,
        description: formDescription,
      }));
    },
    
    useForm(selectedForm) {
        // get form in form table based on name
     selectedForm = this.forms.find((form) => form.formName === selectedForm.name);
      this.currentForm = selectedForm;
      this.formName = selectedForm.formName;
      this.formDescription = selectedForm.formDescription;
      this.formFields = selectedForm.formFields;
    },
    saveData({ formName = null, data = {} }) {
        if (!formName) {
            formName = this.formName;
        }
      const formData = { formName, data };
      this.allData.push(formData);
      localStorage.setItem("allData", JSON.stringify(this.allData));
      
    },
    returnCurrentFormData(){
        return this.allData.find((data) => data.formName === this.formName)?.data || [];
    }
  },
});
