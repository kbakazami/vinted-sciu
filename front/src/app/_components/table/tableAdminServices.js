"use client";
import {Space, Table} from "antd";
import axios from "axios";
import {useEffect, useState} from "react";
import Link from "next/link";
import {deleteServiceById, getServices} from "@/app/utils/services";
const { Column } = Table;

export default function TableAdminServices() {
    const [data, setData] = useState();

    const getServicesList = async () => {
        const response = await getServices();
        setData(response);
    }

    useEffect(() => {
        getServicesList();
    }, []);

    const deleteService = async (serviceId) => {
        await deleteServiceById(serviceId);
        setData(data.filter(item => item.id !== serviceId));
    }

    return (
        <div className="max-w-7xl mx-auto my-10">
            <Table dataSource={data} >
                <Column title="Id" dataIndex="id" key="id" width={50}/>
                <Column title="Nom" dataIndex="title" key="title" width={200} />
                <Column title="Description" dataIndex="description" key="description" ellipsis={true} width={600} />
                <Column title="Categorie" dataIndex="serviceCategory" key="serviceCategory" render={category => category ? category.name : "" } />
                <Column title="Action" key="action" render={(_, record) => (
                    <Space size="middle">
                        <Link href={"/admin/services/" + record.id}>
                            Modifier
                        </Link>
                        <span className="cursor-pointer hover:text-blue-500" onClick={() => {
                            deleteService(record.id);
                        }}>Supprimer</span>
                    </Space>
                )} />
            </Table>
        </div>
    )
}