import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Gọi API để lấy dữ liệu
        axios.get('http://localhost:9011/api/paypal/sale')
            .then(response => {
                // Xử lý dữ liệu và cập nhật trạng thái
                const transformedData = response.data.map(item => ({
                    month: `Tháng ${item.month}`,
                    sales: item.sales * 23000 // Đổi từ USD sang VND với tỷ giá 1 USD = 23000 VND
                }));
                setData(transformedData);
            })
            .catch(error => {
                console.error("Có lỗi xảy ra khi gọi API", error);
            });
    }, []);

    return (
        <ResponsiveContainer width="95%" height={400}>
            <BarChart data={data} margin={{ top: 5, right: 30, left: 50, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)} />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8"  barSize={30} maxBarSize={50} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default SalesChart;
