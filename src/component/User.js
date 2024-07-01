import React, { useEffect, useRef, useState } from "react";
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
  useDataProvider,
  SelectInput,

} from "react-admin";
import ImageUploadForm from "./ImageUploadForm";

const addRoleToUser = async (endpoint, data) => {
  try {
    // Gửi yêu cầu thêm vai trò cho người dùng mới
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to add role to user');
    }
    return response.json();
  } catch (error) {
    throw new Error(`Error adding role to user: ${error.message}`);
  }
};

export const listUser = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="email" />
      <TextField source="phone" />
    
      <TextField source="address" />
      {/* Hiển thị vai trò */}
      <FunctionField
        label="Roles"
        render={(record) =>
          record.roles.map((role, index) => (
            <span key={index}>
              {role.name}
              {index < record.roles.length - 1 && '  ,   '}
            </span>
          ))
        }
      />
      <TextField source="createdAt" />
      <TextField source="updatedAt" />
      <TextField source="status" />
      <EditButton basePath="/users" />
      <DeleteButton basePath="/users" />
    </Datagrid>
  </List>
);

// Tạo một component mới để hiển thị vai trò người dùng




export const EditUser = (props) => {
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };

  
  const redirect = useRedirect();

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [roleChoices, setRoleChoices] = useState([]); // Danh sách vai trò từ API
  const dataProvider = useDataProvider();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:9011/api/user/role');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRoleChoices(data.content.map(role => ({ id: role.id, name: role.name })));
      } catch (error) {
        console.error('Lỗi khi lấy danh sách vai trò:', error);
        // Xử lý lỗi khi lấy danh sách vai trò
      }
    };

    fetchRoles();
  }, []); // Fetch danh sách vai trò khi component được mount

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:9011/api/user/role');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRoleChoices(data.content.map(role => ({ id: role.id, name: role.name })));
      } catch (error) {
        console.error('Lỗi khi lấy danh sách vai trò:', error);
        // Xử lý lỗi khi lấy danh sách vai trò
      }
    };

    fetchRoles();
  }, []); // Fetch danh sách vai trò khi component được mount



  const handleRoleChange = (event) => {
    const { value } = event.target;
    setSelectedRoles(value);
  };

  const handleCreateUser = async (values) => {
    try {
      const { roles,authorities,enabled,credentialsNonExpired,accountNonExpired,accountNonLocked,image,otp, ...userData } = values;
      const { data: newUser } = await dataProvider.update('user', { id:userData.id ,data: userData });
      
      // Gửi yêu cầu thêm vai trò cho người dùng mới
      await addRoleToUser('http://localhost:9011/api/user/add-role', { email: newUser.email, rolename: [selectedRoles] });

      // Redirect đến trang danh sách người dùng sau khi tạo thành công
      redirect("list", "user");
    } catch (error) {
      console.error('Lỗi khi tạo người dùng:', error);
      // Xử lý lỗi khi tạo người dùng
    }
  };

  return(
  <Edit {...props}>
    <SimpleForm onSubmit={handleCreateUser}>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="phone" />
      <TextInput source="username" />
      <TextInput source="password" />
      <TextInput source="address" />
      <SelectInput
          source="roles"
          choices={roleChoices}
          onChange={handleRoleChange}
          optionText="name"
          optionValue="name"
          multiple
        />
      <TextInput source="createdAt" defaultValue={getCurrentDateTime()} />
        <TextInput source="updatedAt" defaultValue={getCurrentDateTime()} />
      <TextInput source="status" />
    </SimpleForm>
  </Edit>
  );
  
}

export const  CreateUser = (props) => {
  const notify = useNotify();
  const redirect = useRedirect();

  const [selectedRoles, setSelectedRoles] = useState([]);
  const [roleChoices, setRoleChoices] = useState([]); // Danh sách vai trò từ API
  const dataProvider = useDataProvider();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:9011/api/user/role');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRoleChoices(data.content.map(role => ({ id: role.id, name: role.name })));
      } catch (error) {
        console.error('Lỗi khi lấy danh sách vai trò:', error);
        // Xử lý lỗi khi lấy danh sách vai trò
      }
    };

    fetchRoles();
  }, []); // Fetch danh sách vai trò khi component được mount

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:9011/api/user/role');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRoleChoices(data.content.map(role => ({ id: role.id, name: role.name })));
      } catch (error) {
        console.error('Lỗi khi lấy danh sách vai trò:', error);
        // Xử lý lỗi khi lấy danh sách vai trò
      }
    };

    fetchRoles();
  }, []); // Fetch danh sách vai trò khi component được mount


  const handleRoleChange = (event) => {
    const { value } = event.target;
    setSelectedRoles(value);
  };

  const handleCreateUser = async (values) => {
    try {
      const { roles, ...userData } = values;
      const { data: newUser } = await dataProvider.create('user', { data: userData });
      
      // Gửi yêu cầu thêm vai trò cho người dùng mới
      await addRoleToUser('http://localhost:9011/api/user/add-role', { email: newUser.email, rolename: [selectedRoles] });

      // Redirect đến trang danh sách người dùng sau khi tạo thành công
      redirect("list", "user");
    } catch (error) {
      console.error('Lỗi khi tạo người dùng:', error);
      // Xử lý lỗi khi tạo người dùng
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toISOString();
  };
  
  const onSuccess = (data) => {
    notify(`Usser created successfully`);
    redirect("list", "user");
  };
  
  return (
    <Create {...props} mutationOptions={{ onSuccess }} redirect="user">
      <SimpleForm onSubmit={handleCreateUser}>
        <TextInput source="name" />
        <TextInput source="email" />
        <TextInput source="phone" />
      
        <TextInput source="password" />
        <TextInput source="address" />
       
        <SelectInput
          source="roles"
          choices={roleChoices}
          onChange={handleRoleChange}
          optionText="name"
          optionValue="name"
          multiple
        />
        <TextInput source="created_at" defaultValue={getCurrentDateTime()} />
        <TextInput source="updated_at" defaultValue={getCurrentDateTime()} />
        <NumberInput source="status" />
      </SimpleForm>
    </Create>
  );
};

