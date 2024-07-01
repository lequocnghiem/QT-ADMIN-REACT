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

export const ListCart = (props) => {
  console.log(' ')

  return (
  <List {...props}>
    <Datagrid>
    <SimpleShowLayout>
    <TextField source="id" />
    <TextField label="product_id" source="productId.title" />
      <TextField source="quantity" />
      <TextField source="image" />
    </SimpleShowLayout>
      <ShowButton/>
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
  );
};
export const ShowCart = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
    <TextField source="id" />
    <TextField label="product_id" source="productId.title" />

      <TextField source="quantity" />
      <TextField source="image" />

    </SimpleShowLayout>
  </Show>
);
export const EditCart = (props) => {

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
        <TextInput source="quantity" />

        <TextInput source="image" />

      </SimpleForm>
    </Edit>
  );
};

export const CreateCart = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();

  const imageUploadFormRef = useRef();


  const onSuccess = (data) => {
    notify(`Cart created successfully`);

    if (imageUploadFormRef.current) {
      imageUploadFormRef.current.handleImageUpload(data.image);
    }redirect("list", "cart");
  };

  return (
    <Create {...props} mutationOptions={{ onSuccess }} redirect="cart">
      <SimpleForm>
      <ReferenceInput
          label="Product_id"
          source="productId.id"
          reference="products"
        >
          <SelectInput optionText="title" />
        </ReferenceInput>
        <TextInput source="quantity" />
        <NumberInput source="image" />
        <ImageUploadForm endpoint="http://localhost:8081/api/cart" ref={imageUploadFormRef} />
      </SimpleForm>
    </Create>
  );
};