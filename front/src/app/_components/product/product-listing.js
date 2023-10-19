import React from 'react';
import { List } from 'antd';
import ProductPull from "@/app/product-pull.png";
import Card from "@/app/_components/card";
import Link from "next/link";

const ProductListing = ({products}) => {
    return (
        <List
            className={"mt-5 mb-12"}
            pagination={{
                position:'bottom',
                align:'center',
                defaultPageSize: 12,
            }}
            grid={{ gutter: 16, column: 4 }}
            dataSource={products}
            renderItem={(item) => (
                <List.Item>
                    <Link key={item.id} href={`/catalog/products/${item.id}`}>
                        <Card src={ProductPull} isProduct={true} title={item.title}/>
                    </Link>
                </List.Item>
            )}
        />
    );
};

export default ProductListing;