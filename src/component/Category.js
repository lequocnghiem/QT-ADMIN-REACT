import React, { useRef } from "react";
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
  useNotify,
  useRedirect,
} from "react-admin";
import ImageUploadForm from "./ImageUploadForm";

export const listCategory = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="slug" />
 
      <TextField source="sortOrder" />
      <TextField source="parentId" />
      <TextField source="metakey" />
      <TextField source="metadesc" />
      <TextField source="createdAt" />
      <TextField source="updatedAt" />
      <TextField source="status" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const editCategory = (props) => {
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };
  return (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="slug" />
      <TextInput source="sortOrder" />
      <TextInput source="parentId" />
      <TextInput source="metakey" />
      <TextInput source="metadesc" />
      <TextInput source="createdAt" defaultValue={getCurrentDateTime()} />
        <TextInput source="updatedAt" defaultValue={getCurrentDateTime()} />
      <TextInput source="status" />
    </SimpleForm>
  </Edit>
);
};

export const CreateCategory = (props) => { // Change createBrand to CreateBrand
  const notify = useNotify();
  const redirect = useRedirect();

  const imageUploadFormRef = useRef();

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };
  
  const onSuccess = (data) => {
    notify(`Category created successfully`);

    if (imageUploadFormRef.current) {
      imageUploadFormRef.current.handleImageUpload(data.image);
    }
    redirect("list", "category");
  };

  return (
    <Create {...props} mutationOptions={{ onSuccess }} redirect="category">
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="slug" />
        <TextInput source="sortOrder" />
        <TextInput source="parentId" />
        <TextInput source="metakey" />
        <TextInput source="metadesc" />
        <TextInput source="createdAt" defaultValue={getCurrentDateTime()} />
        <TextInput source="updatedAt" defaultValue={getCurrentDateTime()} />
        <TextInput source="status" />
      </SimpleForm>
    </Create>
  );
};
