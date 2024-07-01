import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  EditButton,
  TextInput,
  NumberInput,
  Create,
  ReferenceInput,
  SelectInput,
  useNotify,
  useRedirect,
  DeleteButton,
  SelectArrayInput,
  ArrayField,
  SingleFieldList,
  ChipField,
  FunctionField,
} from "react-admin";

export const ColorField = (props) => (
  <FunctionField
    {...props}
    render={(record) => (
      <span
        style={{
          backgroundColor: record.color,
          padding: "5px 10px",
          borderRadius: "5px",
          display: "inline-block",
          width: "20px",
          height: "20px",
        }}
      ></span>
    )}
  />
);

export const listProduct  = (props) => (
  <List {...props}>
    <Datagrid style={{ overflowX: "auto" }}>
      <TextField source="id" label="ID" />
      <TextField source="name" label="Tên sản phẩm" />
      <TextField source="slug" label="Slug" />
      <TextField source="price" label="Giá" />
      <TextField source="qty" label="Số lượng" />
      <ArrayField source="colors" label="Màu sắc">
        <SingleFieldList>
          <ColorField source="color" />
        </SingleFieldList>
      </ArrayField>
      <ArrayField source="sizes" label="Kích thước">
        <SingleFieldList>
          <ChipField source="size" />
        </SingleFieldList>
      </ArrayField>
      <TextField source="description" label="Mô tả" />
      <TextField source="category.name" label="Danh mục" />
      <TextField source="brand.name" label="Thương hiệu" />
      <TextField source="metakey" label="Từ khóa SEO" />
      <TextField source="metadesc" label="Mô tả SEO" />
      <TextField source="createdAt" label="Ngày tạo" />
      <TextField source="updatedAt" label="Ngày cập nhật" />
      <TextField source="status" label="Trạng thái" />

      <EditButton label="Chỉnh sửa" />
      <DeleteButton label="Xóa" />
    </Datagrid>
  </List>
);

const formStyles = {
  form: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
};

export const EditProduct = (props) => {
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };
  const notify = useNotify();
  const redirect = useRedirect();

  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get("http://localhost:9011/api/productcolor");
        setColors(response.data);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    fetchColors();
  }, []);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await axios.get("http://localhost:9011/api/productsize");
        setSizes(response.data);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };

    fetchSizes();
  }, []);

  const handleSave = async (data) => {
    try {
      const response = await axios.put(`http://localhost:9011/api/product/${data.id}`, {
        product: {
          name: data.name,
          description: data.description,
          price: data.price,
          slug: data.slug,
          qty: data.qty,
          metakey: data.metakey,
          metadesc: data.metadesc,
          status: data.status,
          category: data.category,
          brand: data.brand,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        },
        colorIds: data.colorIds,
        sizeIds: data.sizeIds,
      });
      console.log("Sản phẩm đã được cập nhật:", response.data);
      notify(`Sản phẩm đã được cập nhật thành công`);
      redirect("list", "product");
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
    }
  };

  return (
    <Edit {...props}>
      <SimpleForm onSubmit={handleSave} style={formStyles.form}>
        <TextInput source="name" label="Tên sản phẩm" />
        <TextInput source="slug" label="Slug" />
        <NumberInput source="price" label="Giá" />
        <NumberInput source="qty" label="Số lượng" />
        <TextInput source="description" multiline fullWidth label="Mô tả" />
        <ReferenceInput label="Danh mục" source="category.id" reference="category">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Thương hiệu" source="brand.id" reference="brand">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <SelectArrayInput
          label="Màu sắc"
          source="colorIds"
          choices={colors.map(color => ({ id: color.id, color: color.color }))}
          optionText={choice => (
            <div style={{ width: '20px', height: '20px', backgroundColor: choice.color }}></div>
          )}
          optionValue="id"
        />
        <SelectArrayInput
          label="Kích thước"
          source="sizeIds"
          choices={sizes.map((size) => ({ id: size.id, name: size.size }))}
          optionText="name"
          optionValue="id"
        />
        <TextInput source="metakey" label="Từ khóa SEO" />
        <TextInput source="metadesc" label="Mô tả SEO" />
        <TextInput source="createdAt" defaultValue={getCurrentDateTime()} label="Ngày tạo" />
        <TextInput source="updatedAt" defaultValue={getCurrentDateTime()} label="Ngày cập nhật" />
        <NumberInput source="status" label="Trạng thái" />
      </SimpleForm>
    </Edit>
  );
};

export const CreateProduct = (props) => {
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };
  const notify = useNotify();
  const redirect = useRedirect();

  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const response = await axios.get("http://localhost:9011/api/productcolor");
        setColors(response.data);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    fetchColors();
  }, []);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await axios.get("http://localhost:9011/api/productsize");
        setSizes(response.data);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };

    fetchSizes();
  }, []);

  const handleSave = async (data) => {
    try {
      const response = await axios.post("http://localhost:9011/api/product", {
        product: {
          name: data.name,
          description: data.description,
          price: data.price,
          slug: data.slug,
          qty: data.qty,
          metakey: data.metakey,
          metadesc: data.metadesc,
          status: data.status,
          category: data.category,
          brand: data.brand,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        },
        colorIds: data.colorIds,
        sizeIds: data.sizeIds,
      });
      console.log("Sản phẩm đã được tạo:", response.data);
      notify(`Sản phẩm đã được tạo thành công`);
      redirect("list", "product");
    } catch (error) {
      console.error("Lỗi khi tạo sản phẩm:", error);
    }
  };

  return (
    <Create {...props}>
      <SimpleForm onSubmit={handleSave} style={formStyles.form}>
        <TextInput source="name" label="Tên sản phẩm" />
        <TextInput source="slug" label="Slug" />
        <NumberInput source="price" label="Giá" />
        <NumberInput source="qty" label="Số lượng" />
        <TextInput source="description" multiline fullWidth label="Mô tả" />
        <ReferenceInput label="Danh mục" source="category.id" reference="category">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <ReferenceInput label="Thương hiệu" source="brand.id" reference="brand">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <SelectArrayInput
             label="Màu sắc"
             source="colorIds"
           
             choices={colors.map(color => ({ id: color.id, color: color.color }))}
             optionText={choice => (
                 <div style={{ width: '20px', height: '20px', backgroundColor: choice.color }}></div>
             )}
             optionValue="id"
        />
        <SelectArrayInput
          label="Kích thước"
          source="sizeIds"
          choices={sizes.map((size) => ({ id: size.id, name: size.size }))}
          optionText="name"
          optionValue="id"
        />
        <TextInput source="metakey" label="Từ khóa SEO" />
        <TextInput source="metadesc" label="Mô tả SEO" />
        <TextInput source="createdAt" defaultValue={getCurrentDateTime()} label="Ngày tạo" />
        <TextInput source="updatedAt" defaultValue={getCurrentDateTime()} label="Ngày cập nhật" />
        <NumberInput source="status" label="Trạng thái" />
      </SimpleForm>
    </Create>
  );
};
