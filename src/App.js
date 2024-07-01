import React from "react";
import { Admin, Resource } from "react-admin";
import AdminPanel from "./component/AdminPanel";
import {
  listCategory,
  editCategory,
  CreateCategory,
} from "./component/Category";
import { listProduct, editProduct, CreateProduct, EditProduct } from "./component/Products";
import dataProvider from "./component/customDataProvider";
import { CreateUser, EditUser, listUser } from "./component/User";
import { ListOrder, OrderCreate, listOrder } from "./component/Order";
import { CreateSlider, EditSlider, listSlider } from "./component/Slider";
import { CreateBrand, BrandEdit, listBrand } from "./component/Brand";
import { CreateMenu, ListMenu, editMenu } from "./component/Menu";
import { CreateContact, listContact, editContact } from "./component/Contact";
import { CreatePost, EditPost, ListPost, ShowPost } from "./component/Post";
import { CreateTopic, editTopic, listTopic, showTopic } from "./component/Topic";
import { CreateProductimage, EditProductimage, ShowProductimage, listProductimage } from "./component/Productimage";
import { CreateProductSale, EditProductSale, ListProductSale, ShowProductSale } from "./component/ProductSale";
import { RoleCreate, RoleEdit, RoleList } from "./component/Role";
import { ProductColorCreate, ProductColorEdit, ProductColorList } from "./component/Productcolor";
import { ProductsizeCreate, ProductsizeEdit, ProductsizeList } from "./component/Productsize";
import { ListChitiet } from "./component/Paypal";
import { ProductInventoryCreate, ProductInventoryEdit, ProductInventoryList } from "./component/productSL";
import authProvider from "./authProvider";
import MyLoginPage from "./component/MyLoginPage";
import {
  CategoryOutlined,
  LocalOfferOutlined,
  ShoppingCartOutlined,
  PeopleOutlined,
  SlideshowOutlined,
  MenuOutlined,
  ContactMailOutlined,
  PostAddOutlined,
  TopicOutlined,
  ImageOutlined,
  MonetizationOnOutlined,
  SupervisedUserCircleOutlined,
  PaletteOutlined,
  StraightenOutlined,
  PaymentOutlined,
  InventoryOutlined,
  AssignmentOutlined,
} from "@mui/icons-material";

const App = () => (
  <Admin
    loginPage={MyLoginPage}
    dashboard={AdminPanel}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name="category"
      list={listCategory}
      edit={editCategory}
      create={CreateCategory}
      icon={CategoryOutlined}
      options={{ label: "Danh mục" }}
    />
    <Resource
      name="brand"
      list={listBrand}
      edit={BrandEdit}
      create={CreateBrand}
      icon={LocalOfferOutlined}
      options={{ label: "Thương hiệu" }}
    />
    <Resource
      name="product"
      list={listProduct}
      edit={EditProduct}
      create={CreateProduct}
      icon={ShoppingCartOutlined}
      options={{ label: "Sản phẩm" }}
    />
    <Resource
      name="user"
      list={listUser}
      edit={EditUser}
      create={CreateUser}
      icon={PeopleOutlined}
      options={{ label: "Người dùng" }}
    />
    <Resource
      name="sliders"
      list={listSlider}
      edit={EditSlider}
      create={CreateSlider}
      icon={SlideshowOutlined}
      options={{ label: "Thanh trượt" }}
    />
    <Resource
      name="menu"
      list={ListMenu}
      edit={editMenu}
      create={CreateMenu}
      icon={MenuOutlined}
      options={{ label: "Menu" }}
    />
    <Resource
      name="contact"
      list={listContact}
      edit={editContact}
      create={CreateContact}
      icon={ContactMailOutlined}
      options={{ label: "Liên hệ" }}
    />
    <Resource
      name="post"
      list={ListPost}
      edit={EditPost}
      create={CreatePost}
      show={ShowPost}
      icon={PostAddOutlined}
      options={{ label: "Bài viết" }}
    />
    <Resource
      name="topic"
      list={listTopic}
      edit={editTopic}
      create={CreateTopic}
      show={showTopic}
      icon={TopicOutlined}
      options={{ label: "Chủ đề" }}
    />
    <Resource
      name="productimage"
      list={listProductimage}
      edit={EditProductimage}
      create={CreateProductimage}
      show={ShowProductimage}
      icon={ImageOutlined}
      options={{ label: "Ảnh sản phẩm" }}
    />
    <Resource
      name="productsale"
      list={ListProductSale}
      edit={EditProductSale}
      create={CreateProductSale}
      show={ShowProductSale}
      icon={MonetizationOnOutlined}
      options={{ label: "Giảm giá sản phẩm" }}
    />
    <Resource
      name="user/role"
      list={RoleList}
      edit={RoleEdit}
      create={RoleCreate}
      icon={SupervisedUserCircleOutlined}
      options={{ label: "Vai trò người dùng" }}
    />
    <Resource
      name="productcolor"
      list={ProductColorList}
      edit={ProductColorEdit}
      create={ProductColorCreate}
      icon={PaletteOutlined}
      options={{ label: "Quản lý màu sắc" }}
    />
    <Resource
      name="productsize"
      list={ProductsizeList}
      edit={ProductsizeEdit}
      create={ProductsizeCreate}
      icon={StraightenOutlined}
      options={{ label: "Quản lý Kích thước " }}
    />
    <Resource
      name="paypal"
      list={ListChitiet}
      icon={PaymentOutlined}
      options={{ label: "Đơn đặt hàng" }}
    />
    <Resource
      name="productinventory"
      list={ProductInventoryList}
      edit={ProductInventoryEdit}
      create={ProductInventoryCreate}
      icon={InventoryOutlined}
      options={{ label: "Tồn kho sản phẩm" }}
    />
    <Resource
      name="order"
      list={ListOrder}
      create={OrderCreate}
      icon={AssignmentOutlined}
      options={{ label: "Chi tiết đơn đặt hàng" }}
    />
  </Admin>
);

export default App;
