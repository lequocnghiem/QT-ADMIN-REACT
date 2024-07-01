import React, { useRef, useState } from "react";
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
  ReferenceInput,
  SelectInput,
  ShowButton,
  SimpleShowLayout,
  Show,
  NumberInput,
  FunctionField,
  ImageInput,
  ImageField,
} from "react-admin";

import ImageUploadForm from "./ImageUploadForm";

export const ListPost = (props) => {

  return (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField label="Topic_id" source="topic.name" />
      <TextField source="title" />
      <TextField source="detail" />
      <FunctionField
        label="Image"
        render={(record) => (
          <img
            src={`data:image/png;base64, ${record.image}`} // Thay 'image/png' bằng định dạng hình ảnh thích hợp
            alt={record.name}
            width="100"
          />
        )}
      />
      <TextField source="type" />
      <TextField source="created_at" />
      <TextField source="updated_at" />
      <TextField source="status" />
      <ShowButton/>
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
  );
};
export const ShowPost = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
    <TextField source="id" />
      <TextField label="topic_id" source="topic.name" />
      <TextField source="title" />
      <TextField source="detail" />
      <FunctionField
        label="Image"
        render={(record) => (
          <img
            src={`data:image/png;base64, ${record.image}`} // Thay 'image/png' bằng định dạng hình ảnh thích hợp
            alt={record.name}
            width="100"
          />
        )}
      />
      <TextField source="type" />
  
      <TextField source="createdAt" />
      <TextField source="updatedAt" />
      <TextField source="status" />
    </SimpleShowLayout>
  </Show>
);
export const EditPost = (props) => {
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };
  return (
    <Edit {...props}>
      <SimpleForm>
      <ReferenceInput
          label="Topic_id"
          source="topic.id"
          reference="topic"
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput source="title" />
        <TextInput source="detail" />
        <TextInput source="image" />
        <TextInput source="type" />
        
        <TextInput source="createdAt" defaultValue={getCurrentDateTime()} />
        <TextInput source="updatedAt" defaultValue={getCurrentDateTime()}  />
        <TextInput source="status" />
      </SimpleForm>
    </Edit>
  );
};

export const CreatePost = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();

  const imageUploadFormRef = useRef();
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };
  const [selectedImage, setSelectedImage] = useState(true);
  const handleImageChange = (newImageData) => {
    if (newImageData === null) {
      setSelectedImage(true); // Hiển thị hình ảnh gốc khi không có hình ảnh mới được chọn
    } else {
      setSelectedImage(false); // Hiển thị hình ảnh mới được chọn
    }
  };

  const onSuccess = (data) => {
    notify(`Post created successfully`);

    redirect("list", "post");
  };

  return (
    <Create {...props} mutationOptions={{ onSuccess }} redirect="post">
      <SimpleForm>
      <ReferenceInput
          label="Topic"
          source="topic.id"
          reference="topic"
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput source="title" />
        <TextInput source="detail" />
        <ImageInput source="image" label="imageFile" accept="image/*" onChange={handleImageChange}>
        <ImageField source="src" title="title" />
      </ImageInput>
      {selectedImage ? (
        <FunctionField
          label="Image"
          render={(record) => (
            <img
              src={`data:image/png;base64, ${record.image}`}
              alt={record.name}
              width="100"
            />
          )}
        />
      ) : null}
        <TextInput source="type" />
        <TextInput source="createdAt" defaultValue={getCurrentDateTime()} />
        <TextInput source="updatedAt" defaultValue={getCurrentDateTime()} />
        <NumberInput source="status" />
      </SimpleForm>
    </Create>
  );
};