import { IonAvatar, IonIcon, IonImg } from '@ionic/react'
import { location } from 'ionicons/icons'


type ProfilePreviewType = {
    firstName: string;
    state: string;
}

const ProfilePreview: React.FC<ProfilePreviewType> = ({ firstName, state }) => {

    return (
        <div className='d-flex align-items-center justify-content-between'>
            <div>
                <h5 className="h3">Hello {firstName},</h5>
                <small className="text-muted">
                    <IonIcon icon={location} />
                    {state},
                    Nigeria
                </small>
            </div>

            <IonAvatar class='bg-light text-dark d-flex justify-content-center align-items-center'>
                <h4>{firstName['0']}</h4>
            </IonAvatar>
        </div>
    )
}

export default ProfilePreview