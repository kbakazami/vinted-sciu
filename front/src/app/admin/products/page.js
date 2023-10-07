import TableAdmin from "../../_components/table/tableAdmin"

export default function AdminProducts() {
    return (
        <div>
            <h1 className="text-center my-10">Gestion des Produits !</h1>
            <div>
                <h2 className="text-center">Des produits ??</h2>
                <TableAdmin data={"test"} />
            </div>
        </div>
    )
}