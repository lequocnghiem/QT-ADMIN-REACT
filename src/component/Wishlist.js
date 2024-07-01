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
  ReferenceInput,
  SelectInput,
  ShowButton,
  SimpleShowLayout,
  Show,
  NumberInput,
} from "react-admin";

import ImageUploadForm from "./ImageUploadForm";

export const ListWishlist = (props) => {
  console.log(' ')

  return (
  <List {...props}>
    <Datagrid>
    <SimpleShowLayout>
    <TextField source="id" />
    <TextField label="product_id" source="productId.title" />
    <TextField source="image" />
    <TextField source="status" />
    </SimpleShowLayout>
      <ShowButton/>
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
  );
};
export const ShowWishlist = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
    <TextField source="id" />
    <TextField label="product_id" source="productId.title" />
      <TextField source="image" />
    </SimpleShowLayout>
  </Show>
);
export const EditWishlist = (props) => {

  return (
    <Edit {...props}>
      <SimpleForm>
      <ReferenceInput
          label="Product_id"
          source="productId.id"
          reference="products"
        >
          <SelectInput optionText="title" />
        </ReferenceInput>
        <TextInput source="image" />
        <TextInput source="status" />

      </SimpleForm>
    </Edit>
  );
};

export const CreateWishlist = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();

  const imageUploadFormRef = useRef();


  const onSuccess = (data) => {
    notify(`Wishlist created successfully`);

    if (imageUploadFormRef.current) {
      imageUploadFormRef.current.handleImageUpload(data.image);
    }redirect("list", "wishlist");
  };

  return (
    <Create {...props} mutationOptions={{ onSuccess }} redirect="wishlist">
      <SimpleForm>
      <ReferenceInput
          label="Product_id"
          source="productId.id"
          reference="products"
        >
          <SelectInput optionText="title" />
        </ReferenceInput>
        <NumberInput source="image" />
        <NumberInput source="status" />
        <ImageUploadForm endpoint="http://localhost:8081/api/wishlist" ref={imageUploadFormRef} />
      </SimpleForm>
    </Create>
  );
};