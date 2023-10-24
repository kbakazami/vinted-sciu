"use client";
import {Space, Table} from "antd";
import {useEffect, useState} from "react";
import Link from "next/link";
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
        <div className="mt-5 mb-10 admin-table">
            <Table dataSource={data} >
                <Column title="Id" dataIndex="id" key="id" width={100}/>
                <Column title="Nom" dataIndex="name" key="name"/>
                <Column title="Action" key="action" width={100} className={"admin-action-title"} render={(_, record) => (
                    <Space size="middle">
                        <Link href={"/admin/categories/" + record.id} className={"admin-action"}>
                            Modifier
                        </Link>
                        <span className="admin-action delete" onClick={() => {
                            deleteCategory(record.id);
                        }}>Supprimer</span>
                    </Space>
                )} />
            </Table>
        </div>
    )
}