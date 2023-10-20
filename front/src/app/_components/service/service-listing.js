import React, {useEffect, useState} from "react";
import Button from "@/app/_components/button";
import {Bubble} from "@/app/_components/svg";
import Services from "@/app/_components/service/services";
import ServicePopup from "@/app/_components/service/service-popup";
import {List} from "antd";

const ServiceListing = ({services}) => {

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
                <Button href="#" content="Déposer une annonce" className="my-5 w-fit">
                    <Bubble className="text-white"/>
                </Button>
            </div>
            <List
                className={"mt-5 mb-12"}
                pagination={{
                    position:'bottom',
                    align:'center',
                    defaultPageSize: 12,
                }}
                grid={{ gutter: 16, column: 3 }}
                dataSource={services}
                renderItem={(item) => (
                    <List.Item>
                        <Services src={item.thumbnail} username={item.brand} title={item.title} description={item.description} onClick={() => {
                            setIsOpen(true);
                            setSelectedService(item);
                        }}/>
                    </List.Item>
                )}
            />
            <ServicePopup open={isOpen} selectedService={selectedService}/>
        </>
    )
}

export default ServiceListing;