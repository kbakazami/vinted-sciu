"use client";
import {Space, Table} from "antd";
import axios from "axios";
import {useEffect, useState} from "react";
import Link from "next/link";
const { Column } = Table;



export default function TableAdminProducts() {

    const [data, setData] = useState();

    useEffect(() => {
        axios.get("http://localhost:8000/api/articles")
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const deleteProduct = (id) => {
        axios.delete("http://localhost:8000/api/articles/" + id)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })

        setData(data.filter(item => item.id !== id));

    }
    return (
        <div className="max-w-7xl mx-auto my-10">
            <Table dataSource={data} >
                <Column title="Id" dataIndex="id" key="id" />
                <Column title="Nom" dataIndex="title" key="title" />
                <Column title="Description" dataIndex="description" key="description" />
                <Column title="Categorie" dataIndex="category" key="category" render={category => category ? category.name : "" } />
                <Column title="Action" key="action" render={(_, record) => (
                    <Space size="middle">
                        <Link href={"/admin/products/" + record.id}>
                            Modifier
                        </Link>
                        <span className="cursor-pointer hover:text-blue-500" onClick={() => {
                            deleteProduct(record.id);
                        }}>Supprimer</span>
                    </Space>
                )} />
            </Table>
        </div>
    )
}