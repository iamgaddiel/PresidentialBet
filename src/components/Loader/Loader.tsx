import { IonLoading } from "@ionic/react"



type PropType = {
    isOpen: boolean
    message: string
    duration?: number
    fallback: (value: any) => void
}

const Loader: React.FC<PropType> = ({ isOpen, message, fallback, duration }) => {
    return <IonLoading
        isOpen={isOpen}
        message={message}
        onDidDismiss={fallback} duration={duration}
    />
}

export default Loader