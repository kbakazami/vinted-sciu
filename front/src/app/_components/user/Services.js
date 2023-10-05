import {getUserServices} from "@/app/utils/user";
import Services from "@/app/_components/services";
import pfp from "@/app/annonces.jpg";

const UserServices = async () => {

    const services = await getUserServices();

    return (
        <div className={"grid-services-wrapper"}>
            {services.map((service) => {
                return <Services key={service.id} src={pfp} username={service.id} title={service.title}>

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis justo interdum tempus egestas. Ut commodo auctor eros, nec pulvinar diam. Nulla pharetra purus at massa tincidunt mattis. Cras semper elementum risus sed iaculis. Maecenas feugiat est non cursus porta. Integer sed libero nibh. Pellentesque nunc nulla, tristique id volutpat quis, pulvinar sed diam. Aliquam aliquam neque ac aliquet tincidunt.

                    Duis sit amet aliquet magna, eu semper risus. Ut nec gravida justo, a rutrum ante. Morbi sed massa sed nunc bibendum elementum. Etiam in ligula dictum ipsum lobortis tincidunt. Donec ac porttitor ex. In volutpat congue mi, quis commodo diam. Aenean elementum est ac purus posuere bibendum. Vestibulum vel aliquet quam. Duis cursus quam quis odio dapibus hendrerit. Maecenas tristique feugiat ligula non aliquam. Praesent nec justo commodo, ultrices dui in, suscipit odio.
                </Services>
            })}
        </div>
    )
}
export default UserServices;