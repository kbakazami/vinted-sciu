"use client";
import React, {useState} from "react"
import 'keen-slider/keen-slider.min.css';
import {useKeenSlider} from "keen-slider/react";
import Image from "next/image";
import {ChevronLeft, ChevronRight} from "@/app/_components/svg";
import Button from "@/app/_components/button";

function ThumbnailPlugin(mainRef) {
    return (slider) => {
        function removeActive() {
            slider.slides.forEach((slide) => {
                slide.classList.remove("active")
            })
        }
        function addActive(idx) {
            slider.slides[idx].classList.add("active")
        }

        function addClickEvents() {
            slider.slides.forEach((slide, idx) => {
                slide.addEventListener("click", () => {
                    if (mainRef.current) mainRef.current.moveToIdx(idx)
                })
            })
        }

        slider.on("created", () => {
            if (!mainRef.current) return
            addActive(slider.track.details.rel)
            addClickEvents()
            mainRef.current.on("animationStarted", (main) => {
                removeActive()
                const next = main.animator.targetIdx || 0
                addActive(main.track.absToRel(next))
                slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
            })
        })
    }
}

export default function ProductPicturesSlider({pictures, name}) {

    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        loop: true,
    });

    const [thumbnailRef] = useKeenSlider(
        {
            initial: 0,
            slides: {
                perView: 5,
                spacing: 5,
            },
            vertical: true,
        },
        [ThumbnailPlugin(instanceRef)]
    );

    const [opacity, setOpacity] = useState('lg:opacity-0');


    return (
        <div className={"h-[450px] sm:h-[550px] md:h-[620px] lg:w-1/2 gap-x-2 lg:gap-x-4 flex flex-row-reverse product-pictures-slider"}>

            <div ref={sliderRef} className="keen-slider"
                 onMouseEnter={() => setOpacity('lg:opacity-100')}
                 onMouseLeave={() => setOpacity('lg:opacity-0')}>

                {pictures.map((picture, key) => {
                    return <div key={key} className={"keen-slider__slide"}>
                        <Image src={picture} alt={name} width={500} height={620} className={"w-full h-full object-cover cursor-grab"}/>
                    </div>
                })}

                <div className={`flex flex-row justify-between absolute top-1/2 -translate-y-1/2 inset-x-2 ease-in-out duration-300 ${opacity}`}>
                    <Button className={"btn btn-secondary-darker btn-round margin-less"}
                            onClick={(e) => {
                                e.stopPropagation() || instanceRef.current?.prev()
                            }}
                    >
                        <ChevronLeft className={"w-5 h-5"}/>
                    </Button>

                    <Button className={"btn btn-secondary-darker btn-round margin-less"}
                            onClick={(e) => {
                                e.stopPropagation() || instanceRef.current?.next()
                            }}
                    >
                        <ChevronRight className={"w-5 h-5"}/>
                    </Button>
                </div>
            </div>

            <div ref={thumbnailRef} className="keen-slider thumbnail">
                {pictures.map((picture, key) => {
                    return <div key={key} className={"keen-slider__slide"}>
                        <Image src={picture} alt={name} width={120} height={120} className={"w-[120px] h-[120px] object-cover border border-secondary cursor-pointer"}/>
                    </div>
                })}
            </div>
        </div>
    )
}