import { IonAvatar, IonCard, IonCardContent, IonCardHeader, IonContent, IonIcon, IonImg, IonItem, IonList, IonListHeader, IonPage, IonRouterLink, IonSkeletonText, IonText } from '@ionic/react'
import { caretForward, dice, timeOutline } from 'ionicons/icons'
import { useContext, useEffect, useState } from 'react'
import { CandidateType, UserCollectionType } from '../../@types/user'
import Header from '../../components/Header'
import { UtilContext, UtilContextValues } from '../../context/utilContext'
import useAuth from '../../hooks/useAuth'
import useCollection from '../../hooks/useCollection'
import { CANDIDATES_COLLECTION, STAKES_COLLECTION } from '../../keys'
import PlaceholderImage from '../../assets/images/card-media.png'

import './Dashboard.css'
import useSettings from '../../hooks/useSetting'
import CandidateDetailModal from '../../components/CandidateDetailModal'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, A11y, Pagination, Scrollbar } from 'swiper'
import ProfilePreview from '../../components/ProfilePreview'
import NotFound from '../../components/NotFound'

import Coin from '../../assets/svg/blockchain.svg'
import { useQuery } from 'react-query'
import { CollectionContext, CollectionContextType } from '../../context/CollectionProvider'
import { StakeCollectionType } from '../../@types/collections'


type CalculatedStakeType = {
  totalStake: number;
  totalPayout: number;
  odds: number
}

const Dashboard = () => {
  const { setShowTabs } = useContext(UtilContext) as UtilContextValues
  const { getStoredUser, pb } = useAuth()
  const [authUser, setAuthUser] = useState<UserCollectionType>()
  const { getCollectionList, getFilteredCollection } = useCollection()
  const { DEBUG } = useSettings()

  // const [candidates, setCandidates] = useState<CandidateType[]>([])
  const [candidateDetail, setCandidateDetail] = useState<CandidateType>()
  const { getImage } = useContext(UtilContext) as UtilContextValues
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [showStakeModal, setShowModal] = useState(false)
  const [userHistory, setUserHistory] = useState([])
  const [stake, setStake] = useState<CalculatedStakeType>()


  // const queryClient = useQueryClient()
  const { data, isLoading } = useQuery(CANDIDATES_COLLECTION, getAllCandidates)
  const { UserStakes } = useContext(CollectionContext) as CollectionContextType



  const getUser = async () => {
    setAuthUser(await getStoredUser())
  }

  async function getAllCandidates() {
    const response = getCollectionList(CANDIDATES_COLLECTION)
      .then((networkResponse: any) => networkResponse as CandidateType[])
      .catch(err => {
        throw new Error(err)
      })
    return response
  }

  function getCandidateDetail(candidateId: string) {
    let res = data?.find((person: CandidateType) => person.id === candidateId)
    setCandidateDetail(res)
    setModalIsOpen(true)
  }


  function handleSelection() {
    setShowModal(true)
  }


  // todo: move to util
  function calculateSum(item: {} | any) {
    let sum = 0;
    sum += item.a
    return sum
  }

  async function getUserStakeData() {
    const res = await getFilteredCollection(STAKES_COLLECTION, authUser?.id!) as StakeCollectionType
    console.log("🚀 ~ file: Dashboard.tsx:88 ~ getUserStakeData ~ res", res)
  }


  useEffect(() => {
    // console.log(UserStakes, '<----++')
    setShowTabs(true);
    getUser()
    getAllCandidates()
  }, [])

  useEffect(() => {
    getUserStakeData()
  }, [])



  return (
    <IonPage>
      <Header title={'Dashboard'} />
      <IonContent className='ion-padding'>
        {
          authUser?.id! ? (
            <ProfilePreview
              firstName={authUser?.firstName!}
              lastName={authUser?.lastName!}
              state={authUser?.state!}
            />
          ) : null
        }

        {/* Dashboard Banner */}
        <section className='my-4'>
          <IonCard className='text-start text-dark py-3 total-card' style={{ position: "relative " }}>
            <div className="coin_img">
              <IonImg src={Coin} />
            </div>
            <IonCardContent>
              <div className="d-flex justify-content-between align-item-center fw-bold">
                <span>Total Stake</span>
                <h3 className='h3'>₦0</h3>
                {/* <h3 className='h3'>₦ {stake?.totalStake}</h3> */}
              </div>
              <div className="d-flex justify-content-between align-item-center fw-bold">
                <span>Total Payout</span>
                <h3 className='h3'>₦0 </h3>
                {/* <h3 className='h3'>₦ {stake?.totalPayout} </h3> */}
              </div>
              <div className="d-flex justify-content-between align-item-center fw-bold">
                <span>Odds</span>
                <h3 className='h3'>1.5</h3>
                {/* <h3 className='h3'>{stake?.odds}</h3> */}
              </div>
            </IonCardContent>
          </IonCard>
        </section>


        {/* Candidates */}
        <section className="">
          <div className="mt-2 d-flex justify-content-between align-items-center">
            <span className="section_title">Candidates</span>
            {/* <IonIcon icon={caretForward} color={'success'} /> */}
          </div>

          <section className="mt-2">

            {
              !isLoading ? (
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={20}
                  slidesPerView={3}
                  pagination={{ clickable: true }}
                >
                  {
                    data && data.map(({ image, id, fullname }: CandidateType) => (
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
            getStoredUser={getUser}
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
            UserStakes.isLoading ? (
              <div className='mt-4'>
                <IonSkeletonText animated style={{ width: '100%', height: "70px", borderRadius: "20px", margin: "10px auto" }} />
                <IonSkeletonText animated style={{ width: '100%', height: "70px", borderRadius: "20px", margin: "10px auto" }} />
                <IonSkeletonText animated style={{ width: '100%', height: "70px", borderRadius: "20px", margin: "10px auto" }} />
              </div>
            ) : (
              <>
                {
                  UserStakes.data.length > 0 ? (
                    <>
                      <IonList lines='none'>
                        <IonListHeader>
                          <div className="d-flex justify-content-between aligns-item-center">
                            <IonText>Total Stake</IonText>
                            <IonIcon icon={timeOutline} color="success" />
                          </div>
                        </IonListHeader>
                        {
                          UserStakes && UserStakes.data.slice(0, 3).map((stake: StakeCollectionType) => (
                            <IonItem>
                              <IonCard className='stake_card'>
                                <IonCardHeader>
                                  <div className="d-flex align-items-center">
                                    <div className="ion-margin-end">
                                      <IonIcon icon={dice} color="success" size='large' />
                                    </div>
                                    <div>
                                      <small className="text-light">{stake.created}</small>
                                      <h4 className="text-light">{stake.id}</h4>
                                    </div>
                                  </div>
                                </IonCardHeader>
                                <IonCardContent>
                                  <div className="d-flex justify-content-between algin-items-center">
                                    <IonText>Stake....</IonText>
                                    <IonText>{stake.stake}</IonText>
                                  </div>
                                  <div className="d-flex justify-content-between algin-items-center">
                                    <IonText>Odds....</IonText>
                                    <IonText>{stake.odd}</IonText>
                                  </div>
                                  <div className="d-flex justify-content-between algin-items-center">
                                    <IonText>Payout....</IonText>
                                    <IonText>₦ {stake.payout}</IonText>
                                  </div>
                                </IonCardContent>
                              </IonCard>
                            </IonItem>
                          ))
                        }
                      </IonList>
                    </>
                  ) : (
                    <NotFound text='No History' />
                  )
                }
              </>
            )
          }
        </section>


      </IonContent>
    </IonPage>
  )
}

export default Dashboard