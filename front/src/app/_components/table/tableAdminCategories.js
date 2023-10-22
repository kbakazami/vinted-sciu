"use client";
import {Space, Table} from "antd";
import {useEffect, useState} from "react";
import Link from "next/link";
import {deleteServiceCategoryById, getServicesCategories} from "@/app/utils/service-categories";
import {deleteCategoryById, getCategories} from "@/app/utils/categories";
const { Column } = Table;

export default function TableAdminCategories() {
    const [data, setData] = useState();

    const getCategoriesList = async () => {
        const response = await getCategories();
        setData(response);
    }

    useEffect(() => {
        getCategoriesList();
    }, []);

    const deleteCategory = async (serviceId) => {
        await deleteCategoryById(serviceId);
        setData(data.filter(item => item.id !== serviceId));
    }

    return (
        <div className="custom-container my-10">
            <Table dataSource={data} >
                <Column title="Id" dataIndex="id" key="id" width={100}/>
                <Column title="Nom" dataIndex="name" key="name"/>
                <Column title="Action" key="action" width={100} render={(_, record) => (
                    <Space size="middle">
                        <Link href={"/admin/categories/" + record.id}>
                            Modifier
                        </Link>
                        <span className="cursor-pointer hover:text-blue-500" onClick={() => {
                            deleteCategory(record.id);
                        }}>Supprimer</span>
                    </Space>
                )} />
            </Table>
        </div>
    )
}