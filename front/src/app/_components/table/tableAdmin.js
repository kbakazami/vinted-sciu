import { Space, Table, Tag } from "antd";
const { Column, ColumnGroup } = Table;
export default function TableAdmin(props) {

    console.log(props.data[0])

    return (
        <Table dataSource={props.data}>
            <Column title="Nom" dataIndex="title" key="id" />
            <Column title="Description" dataIndex="description" key="id" />
            <Column title="Catégorie" dataIndex="category" key="id" />
        </Table>
    )
}