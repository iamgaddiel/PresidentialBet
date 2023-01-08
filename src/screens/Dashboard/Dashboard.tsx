import { IonAvatar, IonButton, IonCard, IonCardContent, IonContent, IonIcon, IonImg, IonPage, IonRouterLink, IonSkeletonText } from '@ionic/react'
import { addSharp, caretForward } from 'ionicons/icons'
import { useContext, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { CandidateType, UserCollectionType } from '../../@types/user'
import { candidatesAtom } from '../../atom'
import Header from '../../components/Header'
import { UtilContext, UtilContextValues } from '../../context/utilContext'
import useAuth from '../../hooks/useAuth'
import useCollection from '../../hooks/useCollection'
import { CANDIDATES_COLLECTION } from '../../keys'
import PlaceholderImage from '../../assets/images/card-media.png'

import './Dashboard.css'
import useSettings from '../../hooks/useSetting'
import CandidateDetailModal from '../../components/CandidateDetailModal'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, A11y, Pagination, Scrollbar } from 'swiper'
import ProfilePreview from '../../components/ProfilePreview'
import NotFound from '../../components/NotFound'

import Coin from '../../assets/svg/blockchain.svg'


const Dashboard = () => {
  const { setShowTabs } = useContext(UtilContext) as UtilContextValues
  const { getStoredUser, pb } = useAuth()
  const [authUser, setAuthUser] = useState<UserCollectionType>()
  const { getCollectionList } = useCollection()
  const { DEBUG } = useSettings()

  const [candidates, setCandidates] = useState<CandidateType[]>([])
  const [candidateDetail, setCandidateDetail] = useState<CandidateType>()
  const { getImage } = useContext(UtilContext) as UtilContextValues
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [showStakeModal, setShowModal] = useState(false)
  const [userHistory, setUserHistory] = useState([])


  const getUser = async () => {
    setAuthUser(await getStoredUser())
  }

  const getAllCandidates = async () => {
    getCollectionList(CANDIDATES_COLLECTION)
      .then((networkResponse: any) => {
        setCandidates(networkResponse)
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  const getCandidateDetail = (candidateId: string) => {
    let res = candidates?.find(person => person.id === candidateId)
    setCandidateDetail(res)
    setModalIsOpen(true)
  }


  const handleSelection = () => {
    setShowModal(true)
  }


  useEffect(() => {
    setShowTabs(true);
    getUser()
    getAllCandidates()
  }, [])



  return (
    <IonPage>
      <Header title={'Dashboard'} />
      <IonContent className='ion-padding'>
        {
          authUser?.id! ? (
            <ProfilePreview
              firstName={authUser?.firstName!}
              state={authUser?.state!}
            />
          ) : null
        }

        {/* Dashboard Banner */}
        <section className='my-4'>
          <IonCard className='text-center text-dark py-3 total-card' style={{ position: "relative " }}>
            <div className="coin_img">
              <IonImg src={Coin} />
            </div>
            <IonCardContent>
              <small style={{ textTransform: "uppercase" }}>Total Stake</small>
              <h1 className='h1 fw-bold'>₦200000.00</h1>
            </IonCardContent>
          </IonCard>
        </section>


        {/* Candidates */}
        <section className="">
          <div className="mt-2 d-flex justify-content-between align-items-center">
            <span className="section_title">Candidates</span>
            <IonIcon icon={caretForward} color={'success'} />
          </div>

          <section className="mt-2">

            {
              candidates.length > 0 ? (
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={20}
                  slidesPerView={3}
                >
                  {
                    candidates && candidates.map && candidates.map(({ image, id, fullname }) => (
                      <SwiperSlide key={id}>
                        <div className="text-center mb-3 card db py-2 px-1" key={id} onClick={() => getCandidateDetail(id)}>

                          <IonAvatar className='mx-auto'>
                            <IonImg src={getImage(CANDIDATES_COLLECTION, id, image)} alt={fullname} />
                          </IonAvatar>

                          <div className='mt-2'>
                            {<small className="">{fullname}</small>}
                          </div>

                        </div>

                      </SwiperSlide>
                    )
                    )
                  }
                </Swiper>
              ) : (
                <div className='d-flex justify-content-center align-items-between'>
                  <IonAvatar>
                    <IonSkeletonText animated />
                  </IonAvatar>
                  <IonAvatar className='mx-2'>
                    <IonSkeletonText animated />
                  </IonAvatar>
                  <IonAvatar className='mx-2'>
                    <IonSkeletonText animated />
                  </IonAvatar>
                  <IonAvatar className='mx-2'>
                    <IonSkeletonText animated />
                  </IonAvatar>
                  <IonAvatar>
                    <IonSkeletonText animated />
                  </IonAvatar>
                </div>
              )
            }
          </section>

          {/* Sheet Modal */}
          <CandidateDetailModal
            PlaceholderImage={PlaceholderImage}
            candidate={candidateDetail!}
            handleSelection={handleSelection}
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
            user={authUser!}
            showStakeModal={showStakeModal}
            setShowModal={setShowModal}
            image={getImage(CANDIDATES_COLLECTION, candidateDetail?.id!, candidateDetail?.image!)}
          />

        </section>


        {/* History */}
        <section className=''>
          <IonRouterLink routerLink='/history' routerDirection='forward'>
            <div className="mt-2 d-flex justify-content-between align-items-center">
              <span className="section_title">History</span>
              <IonIcon icon={caretForward} color={'success'} />
            </div>
          </IonRouterLink>

          {
            userHistory.length === 0 ? (
              <NotFound text='No History' />
              // <div className='mt-4'>
              //   <IonSkeletonText animated style={{ width: '100%', height: "70px", borderRadius: "20px", margin: "10px auto" }} />
              //   <IonSkeletonText animated style={{ width: '100%', height: "70px", borderRadius: "20px", margin: "10px auto" }} />
              //   <IonSkeletonText animated style={{ width: '100%', height: "70px", borderRadius: "20px", margin: "10px auto" }} />
              // </div>
            ) : null
          }
        </section>


      </IonContent>
    </IonPage>
  )
}

export default Dashboard