import { IonButton, IonContent, IonPage } from '@ionic/react'

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


// types
import { SlideType } from '../../@types/landingSlide'
import SingleLandingsSlide from '../../components/SingleLandingsSlide';

// style
import './LandingPage.css'

// Images
import ElectionImg from '../../assets/svg/undraw_election_day_w842.svg'
import TeamImg from '../../assets/svg/undraw_team_re_0bfe.svg'
import PieChartImg from '../../assets/images/pie-chart.png'
import BarImg from '../../assets/images/bars.png'
import CardImg from '../../assets/images/credit-cards-payment.png'



const slideContent = [
  {
    title: 'Cast Your Vote',
    image: ElectionImg,
    desc: 'Excise your voting power, let your voice be heard by your choice'
  },
  {
    title: 'You Are Not Alone',
    image: TeamImg,
    desc: 'Join others nationwide to enforce change with their vote'
  },
  {
    title: 'Monitor the Elections',
    image: PieChartImg,
    desc: 'follow the election stats as voters vote in realtime'
  },
  {
    title: 'See How Your Money Changes',
    image: BarImg,
    desc: 'You get to see how much your bets will bring for you realtime'
  },
  {
    title: 'Put Your Money Where Your Mouth Is ',
    image: CardImg,
    desc: 'State your confidence in your candidate buy depositing'
  },
]

const LandingPage = () => {
  return (
    <IonPage>
      <IonContent className='ion-padding'>
        <section className="slide-container">
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={1}
            // navigation
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
          >
            {
              slideContent.map((item: SlideType, indx) => (
                <SwiperSlide key={indx}>
                  <SingleLandingsSlide title={item.title} image={item.image} desc={item.desc} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </section>

        <section className="buttons">
          <IonButton
            className='fill'
            size='large'
            fill='clear'
            routerDirection='forward'
            routerLink='/register'
            expand='block'
            shape='round'
            >
            Create Account
          </IonButton>

          <IonButton
            className='outline ion-margin-vertical'
            size='large'
            fill='outline'
            expand='block'
            routerDirection='forward'
            routerLink='/login'
            shape='round'
          >
            Login
          </IonButton>
        </section>
      </IonContent>
    </IonPage>
  )
}

export default LandingPage