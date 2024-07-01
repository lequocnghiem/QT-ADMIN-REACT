import React, { useRef, useState } from "react"; // Import useRef from React
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
  ImageField,
  ImageInput,
} from "react-admin";
import ImageUploadForm from "./ImageUploadForm";

export const listBrand = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="slug" />
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

export const BrandEdit = (props) => {
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
        <TextInput source="name" />
        <TextInput source="slug" />
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
        <TextInput source="metakey" />
        <TextInput source="metadesc" />
        <TextInput source="createdAt" defaultValue={getCurrentDateTime()} />
        <TextInput source="updatedAt" defaultValue={getCurrentDateTime()} />
        <TextInput source="status" />
      </SimpleForm>
    </Edit>
  );
};

export const CreateBrand = (props) => { // Change createBrand to CreateBrand
  const notify = useNotify();
  const redirect = useRedirect();

  const imageUploadFormRef = useRef();

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };
  
  const onSuccess = (data) => {
    notify(`Brand created successfully`);
    redirect("list", "brand");
  };

  return (
    <Create {...props} mutationOptions={{ onSuccess }} redirect="brand">
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="slug" />
        <ImageInput source="image" label="imageFile" accept="image/*">
      <ImageField source="src" title="title" />
    </ImageInput>
        <TextInput source="sortOrder" />
        <TextInput source="metakey" />
        <TextInput source="metadesc" />
        <TextInput source="createdAt" defaultValue={getCurrentDateTime()} />
        <TextInput source="updatedAt" defaultValue={getCurrentDateTime()} />
       
        <TextInput source="status" />
       
      </SimpleForm>
    </Create>
  );
};
