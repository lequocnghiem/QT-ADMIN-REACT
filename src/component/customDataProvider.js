import { fetchUtils } from "react-admin";
import {jwtDecode} from 'jwt-decode';
const apiUrl = "http://localhost:9011/api";
const httpClient = fetchUtils.fetchJson;


const getRoles = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.roles || [];
  }
  return [];
};



const dataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const url = `${apiUrl}/${resource}?page=${page - 1}&size=${perPage}`;

    return httpClient(url)
      .then(({ json }) => {
        let data = json;
        let total = json.length; // Giả sử json là một mảng các đối tượn
        if (resource === 'productcolor' || resource === 'productsize' || resource === 'order'||resource === 'paypal'||resource === 'paypal/recent-orders') {
          data = json; // Sử dụng dữ liệu như bình thường
          total = data.length; // Số lượng bản ghi là độ dài của mảng
      } else {
          data = json.content; // Trích xuất dữ liệu từ trường "content"
          total = json.totalElements; // Sử dụng trường "totalElements" cho tổng số lượng
      }
      return { data, total };
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        throw error;
      });
  },
  getOne: (resource, params) => {
    const { id } = params;
    const url = `${apiUrl}/${resource}/${id}`;

    return httpClient(url)
      .then(({ json }) => {
        return {
          data: json, // Return the fetched data
        };
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        throw error;
      });
  },
  getMany: (resource, params) => {
    const { ids } = params;

    // Construct the URL to fetch multiple records based on their IDs
    const url = `${apiUrl}/${resource}?ids=${ids.join(",")}`;

    return httpClient(url)
      .then(({ json }) => {
        return {
          data: json.content, // Return the fetched data
        };
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        throw error;
      });
  },
  // update: (resource, params) => {
  //   const { id, data } = params;
  //   const url = `${apiUrl}/${resource}/${id}`;
  //   const options = {
  //     method: "PUT",
  //     body: JSON.stringify(data),
  //   };

  //   return httpClient(url, options)
  //     .then(({ json }) => {
  //       return {
  //         data: json, // Return the updated data
  //       };
  //     })
  //     .catch((error) => {
  //       // Handle any errors that occurred during the request
  //       throw error;
  //     });
  // },
  delete: (resource, params) => {

    const roles = getRoles();
  if (!roles.includes('ROLE_SUPER_ADMIN')) {
    // Throw an error object with a message to display on the UI
    return Promise.reject({ message: 'Bạn không có quyền thực hiện thao tác này.' });
  }

  const { id } = params;
  const url = `${apiUrl}/${resource}/${id}`;
  const options = {
    method: "DELETE",
  };

  return httpClient(url, options)
    .then(({ json }) => {
      return {
        data: json, // Return any response data, if needed
      };
    })
    .catch((error) => {
      // Handle any errors that occurred during the request
      throw error; // Propagate the original error if needed
    });
  },
  create: async (resource, params) => {

    const roles = getRoles();
    if (!roles.includes('ROLE_SUPER_ADMIN')) {
      // Throw an error object with a message to display on the UI
      return Promise.reject({ message: 'Bạn không có quyền thực hiện thao tác này.' });
    }
    const { previousData, ...dataWithoutPrevious } = params;
  
    let imageFieldName;
    switch (resource) {
      case 'product':
        imageFieldName = 'imageData';
        break;
      case 'brand':
        imageFieldName = 'image';
        break;
        case 'sliders':
          imageFieldName = 'image';
          break;
          case 'post':
          imageFieldName = 'image';
          break;
          case 'productimage':
            imageFieldName = 'imageData';
            break;
      // Thêm các trường hợp khác nếu cần
    }
    const url = `${apiUrl}${resource === 'order' ? '/add' : `/${resource}`}`;

    const requestData = { ...dataWithoutPrevious };
  
    console.error('Tạo nguồn tài nguyên với tham số:', params);
  
    if (params.data[imageFieldName] && params.data[imageFieldName].rawFile) {
      const imageFile = params.data[imageFieldName].rawFile;
      const reader = new FileReader();
  
      let imageDataAsArray; // Di chuyển khai báo ra khỏi phạm vi if
  
      const byteArray = await new Promise((resolve, reject) => {
        reader.onload = function () {
          const byteArray = new Uint8Array(reader.result);
          imageDataAsArray = Array.from(byteArray); // Gán giá trị cho imageDataAsArray
          resolve(imageDataAsArray);
        };
  
        reader.onerror = function (error) {
          reject(error);
        };
  
        reader.readAsArrayBuffer(imageFile);
      });
  
      if (imageDataAsArray && imageDataAsArray.length > 0) {
        requestData.data[imageFieldName] = imageDataAsArray;
      }
    }
  console.log(params)
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(requestData.data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Phản hồi từ API:', response);
  
      const json = await response.json();
  
      console.error('Phản hồi từ máy chủ:', { data: json });
  
      return { data: json };
    } catch (error) {
      console.error('Lỗi trong quá trình tạo:', error);
      throw error; // Ném lại lỗi để cho React-admin xử lý
    }
  },
  

  update: async (resource, params) => {

    const roles = getRoles();
    if (!roles.includes('ROLE_SUPER_ADMIN')) {
      // Throw an error object with a message to display on the UI
      return Promise.reject({ message: 'Bạn không có quyền thực hiện thao tác này.' });
    }
    const { previousData, ...dataWithoutPrevious } = params;
  
    const url = `${apiUrl}/${resource}/${params.id}`;
    const requestData = { ...dataWithoutPrevious };
  
    let imageFieldName;
    switch (resource) {
      case 'product':
        imageFieldName = 'imageData';
        break;
      case 'brand':
        imageFieldName = 'image';
        break;
      case 'sliders':
          imageFieldName = 'image';
          break;
    case 'post':
          imageFieldName = 'image';
          break;
      // Thêm các trường hợp khác nếu cần
      default:
        imageFieldName = 'imageData'; // Giả định tên mặc định
    }
  
    if (params.data[imageFieldName] && params.data[imageFieldName].rawFile) {
      const imageFile = params.data[imageFieldName].rawFile;
      const reader = new FileReader();
  
      return new Promise((resolve, reject) => {
        reader.onload = function () {
          const byteArray = new Uint8Array(reader.result);
          const imageDataAsArray = Array.from(byteArray);
  
          if (imageDataAsArray && imageDataAsArray.length > 0) {
            requestData.data[imageFieldName] = imageDataAsArray;
          }
  
          fetch(url, {
            method: 'PUT',
            body: JSON.stringify(requestData.data),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(response => response.json())
            .then(json => resolve({ data: json }))
            .catch(error => reject(error));
        };
  
        reader.onerror = function (error) {
          reject(error);
        };
  
        reader.readAsArrayBuffer(imageFile);
      });
    } else {
      return fetch(url, {
        method: 'PUT',
        body: JSON.stringify(requestData.data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(json => ({ data: json }));
    }
  },
  
};

export default dataProvider;
