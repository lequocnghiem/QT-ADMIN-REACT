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
  useRedirect,
  useNotify,
} from "react-admin";

export const ListMenu = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="link" />
      
      <TextField source="parent_id" />
      <TextField source="created_at" />
      <TextField source="updated_at" />
      <TextField source="status" />
      <TextField source="postion" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const editMenu = (props) => {

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };
  return (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="link" />
      <TextInput source="parent_id" />
      <TextInput source="created_at" defaultValue={getCurrentDateTime()} />
      <TextInput source="updated_at" defaultValue={getCurrentDateTime()} />
      <TextInput source="status" />
      <TextInput source="postion" />
    </SimpleForm>
  </Edit>
)
  };

export const CreateMenu = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };

  const onSuccess = (data) => {
    notify(`Slider created successfully`);

   
    redirect("list", "menu");
  };
  return (
  <Create {...props} mutationOptions={{ onSuccess }} redirect="menu">
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="link" />
      <TextInput source="parent_id" />
      <TextInput source="created_at" defaultValue={getCurrentDateTime()} />
      <TextInput source="updated_at" defaultValue={getCurrentDateTime()} />
      <TextInput source="status" />
      <TextInput source="postion" />
    </SimpleForm>
  </Create>
)
  };
