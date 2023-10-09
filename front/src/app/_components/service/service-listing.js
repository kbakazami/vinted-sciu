import {useEffect, useState} from "react";
import {paginate} from "@/app/_helpers/paginate";
import Button from "@/app/_components/button";
import {Bubble} from "@/app/_components/svg";
import Services from "@/app/_components/service/services";
import ServicePopup from "@/app/_components/service/service-popup";
import PaginationCustom from "@/app/_components/pagination";

const ServiceListing = ({servicesListing}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageLimit, setMaxPageLimit] = useState(3);
    const [minPageLimit, setMinPageLimit] = useState(1);

    const pageSize = 12;
    const pagesCount = Math.ceil(servicesListing.length / pageSize);

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

    const paginatedServices = paginate(servicesListing, currentPage, pageSize);

    const [isOpen, setIsOpen] = useState(false);
    const [selectedService, setSelectedService] = useState({});

    const body = document.querySelector("body");

    let overlay = document.createElement('div');

    body.addEventListener('click', (e) => {
        setIsOpen(false);
        overlay.classList.remove('absolute','inset-0','bg-black/80');
    });

    useEffect(() => {
        if(isOpen) {
            body.classList.add('overflow-y-hidden');
            overlay.classList.add('absolute','inset-0','bg-black/80','z-20');
            body.appendChild(overlay);

        } else {
            body.classList.remove('overflow-y-hidden');
        }
    },[isOpen]);

    return (
        <>
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
                    return (
                        <div key={item.id}>
                            <Services src={item.thumbnail} username={item.brand} title={item.title} description={item.description} onClick={() => {
                                setIsOpen(true);
                                setSelectedService(item);
                            }}/>
                            <ServicePopup open={isOpen} selectedService={selectedService}/>
                        </div>
                    )
                })}
            </div>
            <PaginationCustom
                items={servicesListing.length}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={onPageChange}
                maxPageLimit={maxPageLimit}
                minPageLimit={minPageLimit}/>
        </>
    )
}

export default ServiceListing;