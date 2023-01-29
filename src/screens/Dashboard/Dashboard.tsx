import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonContent, IonIcon, IonImg, IonItem, IonList, IonListHeader, IonPage, IonRefresher, IonRefresherContent, IonRouterLink, IonSkeletonText, IonText, RefresherEventDetail, useIonAlert } from '@ionic/react'
import { card, caretForward, dice, timeOutline, wallet } from 'ionicons/icons'
import { useContext, useEffect, useState } from 'react'
import { CandidateType, UserCollectionType } from '../../@types/user'
import Header from '../../components/Header'
import { UtilContext, UtilContextValues } from '../../context/utilContext'
import useAuth from '../../hooks/useAuth'
import useCollection from '../../hooks/useCollection'
import { CANDIDATES_COLLECTION } from '../../keys'
import PlaceholderImage from '../../assets/images/card-media.png'

import './Dashboard.css'
import CandidateDetailModal from '../../components/CandidateDetailModal'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, A11y, Pagination, Scrollbar } from 'swiper'
import ProfilePreview from '../../components/ProfilePreview'
import NotFound from '../../components/NotFound'

import Coin from '../../assets/svg/blockchain.svg'
import { useQuery } from 'react-query'
import { CollectionContext, CollectionContextType } from '../../context/CollectionProvider'
import { StakeCollectionType } from '../../@types/collections'



const Dashboard = () => {
  const { setShowTabs } = useContext(UtilContext) as UtilContextValues
  const { getStoredUser } = useAuth()
  const [authUser, setAuthUser] = useState<UserCollectionType>()
  const { getCollectionList } = useCollection()

  const [candidateDetail, setCandidateDetail] = useState<CandidateType>()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [showStakeModal, setShowModal] = useState(false)
  const [stakeSum, setSumStake] = useState(0)
  const [selectedCandidateOdd, setSelectedCandidateOdd] = useState(0)


  // const queryClient = useQueryClient()
  const { data, isLoading } = useQuery(CANDIDATES_COLLECTION, getAllCandidates)
  const { UserStakes, getUserStakes } = useContext(CollectionContext) as CollectionContextType
  const { getSingleCollection } = useCollection()
  const { getCandidateImage } = useContext(UtilContext) as UtilContextValues




  useEffect(() => {
    setShowTabs(true);
    getUser()
    getAllCandidates()
  }, [])




  async function getUser() {
    const user = await getStoredUser() as UserCollectionType

    getAllUserStakes(user.id)
    getSelectedCandidateOdd(user)
    setAuthUser(user)
  }


  async function getAllUserStakes(userId: string) {
    const userStakes = await getUserStakes(userId)
    calculateSumOfUserStakes(userStakes)
    // setStakes(userStakes)
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


  function calculateSum(stake: number) {
    let sum = 0;
    sum += stake
    return sum
  }

  // Calculated sum of all user stakes
  async function calculateSumOfUserStakes(userStakes: StakeCollectionType[]) {
    const stakeSum: number = userStakes?.map(({ stake }) => calculateSum(stake)).reduce((x: number, y: number) => x + y, 0)
    setSumStake(stakeSum)
    // getSelectedCandidateOdd()
  }


  async function getSelectedCandidateOdd({ selected_candidate }: UserCollectionType) {
    if (selected_candidate) {
      const selectedCandidate = await getSingleCollection(CANDIDATES_COLLECTION, selected_candidate) as CandidateType
      setSelectedCandidateOdd(selectedCandidate?.odds!)
    }
  }


  function handleRefresh(event?: CustomEvent<RefresherEventDetail> | any) {
    setTimeout(() => {
      getUser()
      event?.detail.complete();
    }, 2500);
  }


  return (
    <IonPage>
      <Header title={'Dashboard'} />
      <IonContent className='ion-padding'>


        {/* ============================== ProfileProfile Starts ============================== */}
        {
          authUser?.id! ? (
            <ProfilePreview
              firstName={authUser?.firstName!}
              lastName={authUser?.lastName!}
              state={authUser?.state!}
            />
          ) : null
        }
        {/* ============================== ProfileProfile Ends ============================== */}

        {/* ============================== Refresh Starts ============================== */}
        <IonRefresher slot='fixed' onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {/* ============================== Refresh Ends ============================== */}

        {/* Dashboard Banner */}
        <section className='my-4'>
          <IonCard className='text-start text-dark py-3 total-card' style={{ position: "relative " }}>
            <div className="coin_img">
              <IonImg src={Coin} />
            </div>
            {/* ============================== Banner Starts ============================== */}


            <IonCardContent>
              <div className="d-flex justify-content-between align-item-center fw-bold">
                <span className='d-flex align-items-center h5'>
                  <IonIcon icon={wallet} size="default" /> { }
                  Balance
                </span>
                <h2 className='h2'>₦ {authUser?.wallet_balance!}</h2>
              </div>
              {
                !authUser?.hasSelected ? (
                  <div className='mt-2'>
                    <div className="d-flex justify-content-between align-item-center fw-bold">
                      <span>Total Stake</span>
                      <h3 className='h3'>₦ 0</h3>
                    </div>
                    <div className="d-flex justify-content-between align-item-center fw-bold">
                      <span>Total Payout</span>
                      <h3 className='h3'>₦ 0</h3>
                    </div>
                    <div className="d-flex justify-content-between align-item-center fw-bold">
                      <span>Odds</span>
                      <h3 className='h3'>₦ 0</h3>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="d-flex justify-content-between align-item-center fw-bold">
                      <span>Total Stake</span>
                      <h3 className='h3'>₦ {stakeSum}</h3>
                    </div>
                    <div className="d-flex justify-content-between align-item-center fw-bold">
                      <span>Total Payout</span>
                      <h3 className='h3'>₦ {stakeSum * selectedCandidateOdd} </h3>
                    </div>
                    <div className="d-flex justify-content-between align-item-center fw-bold">
                      <span>Odds</span>
                      <h3 className='h3'>{selectedCandidateOdd}</h3>
                    </div>
                  </>
                )
              }

              <IonButton
                expand='block'
                className='mt-4 text-light text-capitalize'
                fill='default'
                routerDirection='forward'
                routerLink='/topup'
              >
                <IonIcon icon={card} color={"light"} slot="end" />
                Top up
              </IonButton>
            </IonCardContent>
          </IonCard>
        </section>
        {/* ============================== BAnner Ends ============================== */}


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
                            <IonImg src={getCandidateImage(fullname)} alt={fullname} />
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
            image={getCandidateImage(candidateDetail?.fullname!)}
            getUserDetail={getUser}
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
                          UserStakes.data && UserStakes.data.slice(0, 3).map((stake: StakeCollectionType) => (
                            <IonItem key={stake?.id}>
                              <IonCard className='stake_card' key={stake.id}>
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
    </IonPage >
  )
}

export default Dashboard