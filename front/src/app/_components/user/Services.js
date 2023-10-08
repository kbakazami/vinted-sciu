import {getUserServices} from "@/app/utils/user";
import Services from "@/app/_components/service/services";
import pfp from "@/app/annonces.jpg";

const UserServices = async () => {

    const services = await getUserServices();

    return (
        <div className={"grid-services-wrapper"}>
            {services.posts.map((service) => {
                return <Services key={service.id} src={pfp} username={service.id} title={service.title} description={service.body}/>
            })}
        </div>
    )
}
export default UserServices;