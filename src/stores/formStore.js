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
    allData: JSON.parse(localStorage.getItem("allData")) || [],
    editForm: false,
    editData: false,
    socket: null,  // Stocker la référence du socket
  }),

  actions: {
    // Injecter la référence du socket lors de l'initialisation du store
    setSocket(socketInstance) {
      this.socket = socketInstance;
    },

    addField({ fieldName, fieldType, fieldValue, fieldplaceholder }) {
      this.formFields.push({
        fieldName,
        fieldType,
        fieldValue,
        fieldplaceholder,
      });

      // Émettre un événement au serveur
      this.socket?.emit("form-field-added", { fieldName, fieldType, fieldValue });
    },

    addElement({ elementName, elementValue }) {
      this.element = { elementName, elementValue };
      this.data.push(this.element);
      console.log(this.data);
      // Émettre un événement au serveur
      this.socket?.emit("form-element-added", { elementName, elementValue });
    },

    createForm() {
      let forms =  [];
      forms.push({
        formName: this.formName,
        formDescription: this.formDescription,
        formFields: this.formFields,
      });
      localStorage.setItem("forms", JSON.stringify(forms));
      this.forms = JSON.parse(localStorage.getItem("forms")) || [];
      this.resetForm();

      // Émettre un événement au serveur
      this.socket?.emit("form-created", { formName: this.formName });
    },

    editFormFields(element) {
      this.editForm = true;
      this.currentForm = this.forms.find((form) => form.formName === element.name);
      this.formName = this.currentForm.formName;
      this.formDescription = this.currentForm.formDescription;
      this.formFields = [...this.currentForm.formFields];

      // Émettre un événement au serveur
      this.socket?.emit("form-edited", { formName: this.formName });
    },

    updateForm() {
      this.forms = this.forms.map((form) => {
        if (form.formName === this.currentForm.formName) {
          form.formName = this.formName;
          form.formDescription = this.formDescription;
          form.formFields = [...this.formFields];
        }
        return form;
      });
      localStorage.setItem("forms", JSON.stringify(this.forms));
      this.editForm = false;

      // Émettre un événement au serveur
      this.socket?.emit("client-message", { formName: this.formName });
    },

    deleteForm(element) {
      this.forms = this.forms.filter((form) => form.formName !== element.name);
      localStorage.setItem("forms", JSON.stringify(this.forms));

      // Remove all data related to the form
      this.allData = this.allData.filter((data) => data.formName !== element.name);
      localStorage.setItem("allData", JSON.stringify(this.allData));
      this.resetForm();

      // Émettre un événement au serveur
      this.socket?.emit("client-message", { formName: element.name });
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
    resetAllFieldsValueInformFields(){
      this.formFields = this.formFields.map((field) => {
        field.fieldValue = "";
        return field;
      });
    },

    getFieldsInfo(fields) {
      return fields.map(({ formName, formDescription }) => ({
        name: formName,
        description: formDescription,
      }));
    },

    useForm() {
     let selectedForm= this.forms[0];
      this.currentForm = selectedForm;
      this.formName = selectedForm.formName;
      this.formDescription = selectedForm.formDescription;
      this.formFields = selectedForm.formFields;

      // Émettre un événement au serveur
      this.socket?.emit("client-message", { formName: this.formName });
    },

    saveData({ formName = null, data = {} }) {
      // if (!formName) {
      //   formName = this.formName;
      // }
      // const formData = { formName, data };
      this.allData.push(data);
      localStorage.setItem("allData", JSON.stringify(this.allData));

      // Émettre un événement au serveur
      this.socket?.emit("client-message", { formName, data });
    },

    returnCurrentFormData() {
      return this.allData.find((data) => data.formName === this.formName)?.data || [];
    },
  },
});
