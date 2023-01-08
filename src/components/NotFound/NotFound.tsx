import { IonImg, IonText } from "@ionic/react"
import React from "react";

import NotFroundImage from '../../assets/svg/no_match_illustration_v3_darkmode.svg'

import './NotFound.css';


type PropType = {
    text?: string
}
const NotFound: React.FC<PropType> = ({ text }) => {
    return (
        <section className="not_found_wrapper">
            <div className="not_found text-center">
                <div className="not_found_img_wrapper">
                    <IonImg src={NotFroundImage} alt={"Not Found Image"} />
                </div>
                <IonText className="text-center mt-2 text-light not_found_text">{text}</IonText>
            </div>
        </section>
    )
}

export default NotFound