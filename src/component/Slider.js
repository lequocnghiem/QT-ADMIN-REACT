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
  NumberInput,
  FunctionField,
  ImageInput,
  ImageField,
} from "react-admin";
import ImageUploadForm from "./ImageUploadForm";

// ... Các components khác

export const listSlider = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="link" />
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
      <TextField source="sortOrder" />
      <TextField source="position" />
      <TextField source="createdAt" />
      <TextField source="updatedAt" />
      <TextField source="createdBy" />
      <TextField source="updatedBy" />
      <TextField source="status" />
      <EditButton />
      <DeleteButton/>
    </Datagrid>
  </List>
);

export const EditSlider = (props) => {
  const [selectedImage, setSelectedImage] = useState(true);
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };


 

  const handleImageChange = (newImageData) => {
    if (newImageData === null) {
      setSelectedImage(true); // Hiển thị hình ảnh gốc khi không có hình ảnh mới được chọn
    } else {
      setSelectedImage(false); // Hiển thị hình ảnh mới được chọn
    }
  };
  return (
  
  <Edit {...props}>
    <SimpleForm>
    <TextInput source="title" />
      <TextInput source="link" />
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
      <TextInput source="sortOrder" />
      <TextInput source="position" />
      <TextInput source="createdAt" defaultValue={getCurrentDateTime()} />
      <TextInput source="updatedAt" defaultValue={getCurrentDateTime()} />
      <TextInput source="status" />

    </SimpleForm>
  </Edit>
  );
};
export const  CreateSlider = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();

  const imageUploadFormRef = useRef();

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };
  
  const onSuccess = (data) => {
    notify(`Slider created successfully`);

   
    redirect("list", "sliders");
  };
  return (
    <Create {...props} mutationOptions={{ onSuccess }} redirect="sliders">
      <SimpleForm>
      <TextInput source="title" />
        <TextInput source="link" />
      
        <ImageInput source="image" label="imageFile" accept="image/*">
      <ImageField source="src" title="title" />
    </ImageInput>
        <NumberInput source="sortOrder" />
        <NumberInput source="position" />
        <TextInput source="createdAt" defaultValue={getCurrentDateTime()} />
      <TextInput source="updatedAt" defaultValue={getCurrentDateTime()} />
        <NumberInput source="status" />
      </SimpleForm>
    </Create>
  );
};

