import { IonLoading } from "@ionic/react"



type PropType = {
    isOpen: boolean
    message: string
    fallback: (value:any) => void
}

const Loader: React.FC<PropType> = ({ isOpen, message, fallback}) => {
    return <IonLoading isOpen={isOpen} message={message} onDidDismiss={fallback} />
}

export default Loader