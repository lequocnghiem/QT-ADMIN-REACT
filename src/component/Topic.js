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

  SimpleShowLayout,
  Show,
  ShowButton,
  useNotify,
  useRedirect,
} from "react-admin";


export const listTopic = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="slug" />
     
   
      <TextField source="created_at" />
      <TextField source="updated_at" />
 
      <TextField source="status" />
      <ShowButton/>
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
export const showTopic = (props) => {
  return (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="slug" />
    
      <TextField source="createdAt" />
      <TextField source="updatedAt" />
     
      <TextField source="status" />

    </SimpleShowLayout>
  </Show>
  );
};

export const editTopic = (props) => {

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };
  return (
  <Edit {...props}>
    <SimpleForm>
    <TextInput source="name" />
      <TextInput source="slug" />
  
   
      <TextInput source="createdAt" defaultValue={getCurrentDateTime()} />
      <TextInput source="updatedAt" defaultValue={getCurrentDateTime()} />
      <TextInput source="status" />
    </SimpleForm>
  </Edit>
)
};

export const CreateTopic = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();



  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };
  
  const onSuccess = (data) => {
    notify(`Slider created successfully`);

   
    redirect("list", "topic");
  };
  return (
  <Create {...props} mutationOptions={{ onSuccess }} redirect="topic">
    <SimpleForm>
    <TextInput source="name" />
      <TextInput source="slug" />
 
      <TextInput source="createdAt" defaultValue={getCurrentDateTime()} />
      <TextInput source="updatedAt" defaultValue={getCurrentDateTime()} />
      <TextInput source="status" />
 
    </SimpleForm>
  </Create>
)
  };
