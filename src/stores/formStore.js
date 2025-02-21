// store sur les formulaire
import { defineStore } from 'pinia'
export const useFormStore = defineStore('formStore',{
    state:() =>(
        {
            formFields:[],
            field: {},
            element: {},
            data: [],
            test: 'test',
            forms: [],
            formName: '',
            preview: false,
        }
    ),
    actions: {
        addField({fieldName, fieldType, fieldValue}) {
            this.formFields.push({fieldName, fieldType, fieldValue, fieldplaceholder});
        },
        addElement({elementName, elementValue}) {
            this.element = {elementName, elementValue};
            this.data.push(this.element);
        },
        createForm(){
            this.forms.push({formName: this.formName, formFields: this.formFields});
            this.resetForm();
        },
        resetForm() {
            this.formFields = [];
            this.field = {};
            this.element = {};
            this.data = [];
        },
    },
});