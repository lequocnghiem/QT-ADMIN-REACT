import React, { useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  EditButton,
  TextInput,
  Create,
  ReferenceInput,
  SelectInput,
  useNotify,
  useRedirect,
  DeleteButton,
  SimpleShowLayout,
  Show,
  ShowButton,
  FunctionField,
  ImageInput,
  ImageField,
  BooleanInput,
} from "react-admin";
import { BooleanField } from "ra-ui-materialui"; // Import BooleanField from ra-ui-materialui
import axios from "axios";

export const listProductimage = (props) => (
  <List {...props}>
    <Datagrid style={{ overflowX: "auto" }}>
      <TextField source="id" />
      <TextField label="Mã sản phẩm" source="product.name" />
      <FunctionField
        label="Hình ảnh"
        render={(record) => (
          <img
            src={`data:image/png;base64, ${record.imageData}`}
            alt={record.name}
            width="100"
          />
        )}
      />
      <BooleanField label="Hình ảnh chính" source="isPrimary" /> {/* Sử dụng BooleanField từ ra-ui-materialui */}
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export const ShowProductimage = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField label="Mã sản phẩm" source="product.name" />
      <FunctionField
        label="Hình ảnh"
        render={(record) => (
          <img
            src={`data:image/png;base64, ${record.imageData}`}
            alt={record.name}
            width="100"
          />
        )}
      />
      <BooleanField label="Hình ảnh chính" source="isPrimary" /> {/* Sử dụng BooleanField từ ra-ui-materialui */}
    </SimpleShowLayout>
  </Show>
);

export const EditProductimage = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = async (data) => {
    const dataArray = [data];

    if (data.imageData && data.imageData.rawFile) {
      const imageFile = data.imageData.rawFile;
      const reader = new FileReader();

      const byteArray = await new Promise((resolve, reject) => {
        reader.onload = function () {
          const byteArray = new Uint8Array(reader.result);
          const imageDataAsArray = Array.from(byteArray);
          resolve(imageDataAsArray);
        };

        reader.onerror = function (error) {
          reject(error);
        };

        reader.readAsArrayBuffer(imageFile);
      });

      if (byteArray && byteArray.length > 0) {
        dataArray[0].imageData = byteArray;
      }
    }

    axios
      .put(`http://localhost:9011/api/productimage/${data.id}`, data)
      .then((response) => {
        redirect("list", "productimage");
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [selectedImage, setSelectedImage] = useState(true);
  const handleImageChange = (newImageData) => {
    if (newImageData === null) {
      setSelectedImage(true);
    } else {
      setSelectedImage(false);
    }
  };

  return (
    <Edit {...props}>
      <SimpleForm onSubmit={onSuccess}>
        <ReferenceInput
          label="Mã sản phẩm"
          source="product.id"
          reference="product"
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ImageInput
          source="imageData"
          label="Hình ảnh"
          accept="image/*"
          onChange={handleImageChange}
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        {selectedImage ? (
          <FunctionField
            label="Hình ảnh hiện tại"
            render={(record) => (
              <img
                src={`data:image/png;base64, ${record.imageData}`}
                alt={record.name}
                width="100"
              />
            )}
          />
        ) : null}
       <BooleanInput label="Hình ảnh chính " source="isPrimary" /> {/* Sử dụng BooleanField từ ra-ui-materialui */}
      </SimpleForm>
    </Edit>
  );
};

export const CreateProductimage = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();

  const onSuccess = async (data) => {
    const dataArray = [data];

    if (data.imageData && data.imageData.rawFile) {
      const imageFile = data.imageData.rawFile;
      const reader = new FileReader();

      const byteArray = await new Promise((resolve, reject) => {
        reader.onload = function () {
          const byteArray = new Uint8Array(reader.result);
          const imageDataAsArray = Array.from(byteArray);
          resolve(imageDataAsArray);
        };

        reader.onerror = function (error) {
          reject(error);
        };

        reader.readAsArrayBuffer(imageFile);
      });

      if (byteArray && byteArray.length > 0) {
        dataArray[0].imageData = byteArray;
      }
    }

    axios
      .post("http://localhost:9011/api/productimage", dataArray)
      .then((response) => {
        redirect("list", "productimage");
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Create {...props}>
      <SimpleForm onSubmit={onSuccess}>
        <ReferenceInput
          label="Mã sản phẩm"
          source="product.id"
          reference="product"
        >
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ImageInput
          source="imageData"
          label="Hình ảnh"
          accept="image/*"
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <BooleanInput  label="Hình ảnh chính" source="isPrimary" /> {/* Sử dụng BooleanField từ ra-ui-materialui */}
      </SimpleForm>
    </Create>
  );
};
