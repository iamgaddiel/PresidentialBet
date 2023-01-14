import { IonAvatar, IonContent, IonImg, IonPage, IonRefresher, IonRefresherContent, IonSearchbar, IonSkeletonText } from '@ionic/react'
import { chevronDownCircleOutline, chevronDownCircle, close } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { StakeCollectionType } from '../../@types/collections'
import { CandidateType } from '../../@types/user'
import Header from '../../components/Header'
import { UtilContext, UtilContextValues } from '../../context/utilContext'
import useCollection from '../../hooks/useCollection'
import useSettings from '../../hooks/useSetting'
import { CANDIDATES_COLLECTION, STAKES_COLLECTION } from '../../keys'
// import Chart from 'chartjs/auto'

import './Stats.css'



type CandidateStatsType = {
    candidateId: string;
    votes: number
}

const Stats = () => {
    const { DEBUG } = useSettings()
    const { getCollectionList } = useCollection()
    const { getImage } = useContext(UtilContext) as UtilContextValues

    const omoyeleId = DEBUG ? "4bhnf50221rhr3f" : "gwwaqmi4bc6t4lt"
    const kwankwasoId = DEBUG ? "ge8jxtp4whpficw" : "2uumoulo8q73v7s"
    const atikuId = DEBUG ? "vmnhv7dhb6wtrtk" : "8vxfrra483ytfpn"
    const tinubuId = DEBUG ? "gzfqprqe9deoqi1" : "t7s4hujq9tqwvcp"
    const peterId = DEBUG ? "rir91u5la6mnypz" : "u5qiza9qgd6j10c"

    const [omoyeleVotes, setOmoyeleVotes] = useState<CandidateStatsType>()
    const [kwankwasoVotes, setKwankwasoVotes] = useState<CandidateStatsType>()
    const [atikuVotes, setAtikuVotes] = useState<CandidateStatsType>()
    const [tinubuVotes, setTinubuVotes] = useState<CandidateStatsType>()
    const [peterVotes, setPeterVotes] = useState<CandidateStatsType>()


    // const stakesQuery = useQuery(STAKES_COLLECTION, getStakes)
    const candidates = useQuery(CANDIDATES_COLLECTION, getCandidates)

    async function getCalculatedStakes() {

        const res = await getCollectionList(STAKES_COLLECTION) as StakeCollectionType[]

        const noOfVotesForKwankwaso = res?.filter(res => res?.candidate === kwankwasoId).length!
        const noOfVotesForOmoyele = res?.filter(res => res?.candidate === omoyeleId).length!
        const noOfVotesForAtiku = res?.filter(res => res?.candidate === atikuId).length!
        const noOfVotesForTinubu = res?.filter(res => res?.candidate === tinubuId).length!
        const noOfVotesForPeter = res?.filter(res => res?.candidate === peterId).length!

        setOmoyeleVotes({ candidateId: omoyeleId, votes: Math.floor(noOfVotesForOmoyele / res?.length!) * 100 })
        setKwankwasoVotes({ candidateId: kwankwasoId, votes: Math.floor((noOfVotesForKwankwaso / res?.length!) * 100) })
        setAtikuVotes({ candidateId: atikuId, votes: Math.floor((noOfVotesForAtiku / res?.length!) * 100) })
        setTinubuVotes({ candidateId: tinubuId, votes: Math.floor((noOfVotesForTinubu / res?.length!) * 100) })
        setPeterVotes({ candidateId: peterId, votes: Math.floor((noOfVotesForPeter / res?.length!) * 100) })

        // return res
    }

    async function getCandidates() {
        return await getCollectionList(CANDIDATES_COLLECTION) as CandidateType[]
    }


    function handleRefresh() {
        getCalculatedStakes()
    }

    function isDark(range: number) {
        if (range > 30) return "dark";
        return "light"
    }


    useEffect(() => {
        getCalculatedStakes()
    }, [])


    return (
        <IonPage>
            <Header title="Election Statistics" />
            <IonContent className='ion-padding' fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent
                        pullingIcon={chevronDownCircleOutline}
                        pullingText="Pull to refresh"
                        refreshingSpinner="circles"
                        refreshingText="Refreshing..."
                    ></IonRefresherContent>
                </IonRefresher>
                {
                    !candidates.isLoading ? (
                        <>
                            {
                                candidates?.data && candidates?.data?.map((candidate: CandidateType) => (
                                    <div className="candidate_instance rounded my-3 d-flex align-items-center" key={candidate?.id}>
                                        {
                                            candidate?.id === omoyeleVotes?.candidateId &&
                                            <span className="candidate_stats_pg" style={{ width: `${omoyeleVotes?.votes}%` }}></span>
                                        }
                                        {
                                            candidate?.id === kwankwasoVotes?.candidateId &&
                                            <span className="candidate_stats_pg" style={{ width: `${kwankwasoVotes?.votes}%` }}></span>
                                        }
                                        {
                                            candidate?.id === atikuVotes?.candidateId &&
                                            <span className="candidate_stats_pg" style={{ width: `${atikuVotes?.votes}%` }}></span>
                                        }
                                        {
                                            candidate?.id === tinubuVotes?.candidateId &&
                                            <span className="candidate_stats_pg" style={{ width: `${tinubuVotes?.votes}%` }}></span>
                                        }
                                        {
                                            candidate?.id === peterVotes?.candidateId &&
                                            <span className="candidate_stats_pg" style={{ width: `${peterVotes?.votes}%` }}></span>
                                        }
                                        <IonAvatar>
                                            <IonImg
                                                src={getImage(CANDIDATES_COLLECTION, candidate?.id, candidate?.image)}
                                                alt={"candidates"}
                                            />
                                        </IonAvatar>
                                        <div className="candidates_percentage ion-margin-start">
                                            {
                                                candidate?.id === omoyeleVotes?.candidateId ?
                                                    <h3 className={`text-${isDark(omoyeleVotes?.votes)}`}>{omoyeleVotes?.votes!}%</h3> :
                                                    null
                                            }
                                            {
                                                candidate?.id === kwankwasoVotes?.candidateId ?
                                                    <h3 className={`text-${isDark(kwankwasoVotes?.votes)}`}>{kwankwasoVotes?.votes!}%</h3> :
                                                    null
                                            }
                                            {
                                                candidate?.id === atikuVotes?.candidateId ?
                                                    <h3 className={`text-${isDark(atikuVotes?.votes)}`}>{atikuVotes?.votes!}%</h3> :
                                                    null
                                            }
                                            {
                                                candidate?.id === tinubuVotes?.candidateId ?
                                                    <h3 className={`text-${isDark(tinubuVotes?.votes)}`}>{tinubuVotes?.votes!}%</h3> :
                                                    null
                                            }
                                            {
                                                candidate?.id === peterVotes?.candidateId ?
                                                    <h3 className={`text-${isDark(peterVotes?.votes)}`}>{peterVotes?.votes!}%</h3> :
                                                    null
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </>

                    ) : (
                        <>
                            <IonSkeletonText className="my-2" animated style={{ width: "100%", height: "100px" }} />
                            <IonSkeletonText className="my-2" animated style={{ width: "75%", height: "100px" }} />
                            <IonSkeletonText className="my-2" animated style={{ width: "50%", height: "100px" }} />
                            <IonSkeletonText className="my-2" animated style={{ width: "25%", height: "100px" }} />
                        </>
                    )
                }

            </IonContent>
        </IonPage>
    )
}

export default Stats