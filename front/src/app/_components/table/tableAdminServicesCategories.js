"use client";
import {Space, Table} from "antd";
import {useEffect, useState} from "react";
import Link from "next/link";
import {deleteServiceCategoryById, getServicesCategories} from "@/app/utils/service-categories";
import Button from "@/app/_components/button";
const { Column } = Table;

export default function TableAdminServicesCategories() {
    const [data, setData] = useState();

    const getServicesCategoriesList = async () => {
        const response = await getServicesCategories();
        setData(response);
    }

    useEffect(() => {
        getServicesCategoriesList();
    }, []);

    const deleteServiceCategory = async (serviceId) => {
        await deleteServiceCategoryById(serviceId);
        setData(data.filter(item => item.id !== serviceId));
    }

    return (
        <div className="mt-5 mb-10 admin-table">
            <Table dataSource={data} >
                <Column title="Id" dataIndex="id" key="id" width={100}/>
                <Column title="Nom" dataIndex="name" key="name"/>
                <Column title="Action" key="action" width={100} className={"admin-action-title"} render={(_, record) => (
                    <Space size="middle">
                        <Link href={"/admin/services-categories/" + record.id} className={"admin-action"}>
                            Modifier
                        </Link>
                        <span className="admin-action delete" onClick={() => {
                            deleteServiceCategory(record.id);
                        }}>Supprimer</span>
                    </Space>
                )} />
            </Table>
        </div>
    )
}