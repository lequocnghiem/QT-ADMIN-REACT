import React from "react";
import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  EditButton,
  TextInput,
  Create,
  DeleteButton,
  NumberInput,
  ReferenceInput,
  SelectInput,
  useNotify,
  useRedirect,
} from "react-admin";

export const listContact = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField label="User id" source="user.name" />
      <TextField source="name" />
      <TextField source="email" />
      <TextField source="phone" />
      <TextField source="title" />
      <TextField source="content" />
      <TextField source="created_at" />
      <TextField source="updated_at" />
      <TextField source="status" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const editContact = (props) => {

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };
  return (
  <Edit {...props}>
    <SimpleForm>
    <ReferenceInput
            label="User"
            source="user.id"
            reference="user"
      >
      <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="phone" />
      <TextInput source="title" />
      <TextInput source="content" />
      <TextInput source="created_at" defaultValue={getCurrentDateTime()} />
      <TextInput source="updated_at" defaultValue={getCurrentDateTime()} />

      <TextInput source="status" />
    </SimpleForm>
  </Edit>
)
  };

export const CreateContact = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };

  const onSuccess = (data) => {
    notify(`Slider created successfully`);

   
    redirect("list", "contact");
  };
  return (
  <Create {...props} mutationOptions={{ onSuccess }} redirect="contact">
    <SimpleForm>
     
      <ReferenceInput
            label="User"
            source="user.id"
            reference="user"
      >
      <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="phone" />
      <TextInput source="title" />
      <TextInput source="content" />
      <TextInput source="created_at" defaultValue={getCurrentDateTime()} />
      <TextInput source="updated_at" defaultValue={getCurrentDateTime()} />
      <NumberInput source="status" />
    </SimpleForm>
  </Create>
)
  };
