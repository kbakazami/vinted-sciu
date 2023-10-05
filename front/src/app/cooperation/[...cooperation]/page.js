'use client';
import {useEffect, useState} from "react";
import PaginationCustom from "@/app/_components/pagination";
import {paginate} from "@/app/_helpers/paginate";
import pfp from '../../annonces.jpg';
import axios from "axios";
import Services from "@/app/_components/services";
import Button from "@/app/_components/button";
import {Bubble} from "@/app/_components/svg";

export default function Service ({ params }) {

    const [services = [], setServices] = useState();
    let servicesList = [];

    useEffect(() => {
        async function fetchServices() {
            const response = await axios.get("https://jsonplaceholder.typicode.com/todos");
            setServices(response.data);
        }
        fetchServices();
    }, []);

    services.forEach(service => {
        servicesList.push(service);
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageLimit, setMaxPageLimit] = useState(3);
    const [minPageLimit, setMinPageLimit] = useState(1);

    const pageSize = 12;
    const pagesCount = Math.ceil(services.length / pageSize);

    const onPageChange = (page) => {
        if (page >= maxPageLimit && (page + 4) === pagesCount)
        {
            setMaxPageLimit(maxPageLimit + 4);
            setMinPageLimit(minPageLimit + 2);
        }
        else if ((page + 5) === pagesCount && page <= minPageLimit)
        {
            setMaxPageLimit(maxPageLimit - 6);
            setMinPageLimit(minPageLimit - 2);
        }
        else if (page === pagesCount) {
            setMaxPageLimit(pagesCount + 4);
            setMinPageLimit(pagesCount - 4);
        }
        else if (page <= minPageLimit)
        {
            setMaxPageLimit(maxPageLimit - 1);
            setMinPageLimit(minPageLimit - 1);
        } else if(page >= maxPageLimit)
        {
            setMaxPageLimit(maxPageLimit + 1);
            setMinPageLimit(minPageLimit + 1);
        }
        setCurrentPage(page);
    }

    const paginatedServices = paginate(servicesList, currentPage, pageSize);

    return (
        <div className={"custom-container"}>
            <h1 className={"uppercase font-bold mt-5"}>{params.cooperation}</h1>
            <div>
                <p className={"text-center"}>
                    Vous pouvez déposer vos demandes ici si vous ne trouvez pas votre bonheur parmis les objets déjà présents !<br/>
                    Vous pouvez également trouver un utilisateur qui cherche l’objet dont vous n’avez plus besoin !
                </p>
                <Button href="#" content="Déposer une annonce" className="my-5">
                    <Bubble className="text-white"/>
                </Button>
            </div>
            <div className={"grid-services-wrapper"}>
                {paginatedServices.map((item) => {
                    return <Services key={item.id} src={pfp} username={item.id} title={item.title}>

                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed convallis justo interdum tempus egestas. Ut commodo auctor eros, nec pulvinar diam. Nulla pharetra purus at massa tincidunt mattis. Cras semper elementum risus sed iaculis. Maecenas feugiat est non cursus porta. Integer sed libero nibh. Pellentesque nunc nulla, tristique id volutpat quis, pulvinar sed diam. Aliquam aliquam neque ac aliquet tincidunt.

                        Duis sit amet aliquet magna, eu semper risus. Ut nec gravida justo, a rutrum ante. Morbi sed massa sed nunc bibendum elementum. Etiam in ligula dictum ipsum lobortis tincidunt. Donec ac porttitor ex. In volutpat congue mi, quis commodo diam. Aenean elementum est ac purus posuere bibendum. Vestibulum vel aliquet quam. Duis cursus quam quis odio dapibus hendrerit. Maecenas tristique feugiat ligula non aliquam. Praesent nec justo commodo, ultrices dui in, suscipit odio.
                    </Services>
                })}
            </div>
            <PaginationCustom
                items={servicesList.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
                maxPageLimit={maxPageLimit}
                minPageLimit={minPageLimit}/>
        </div>
    )
}
