import useHttp from './useHttp'
import useSettings from './useSetting'

const useApi = () => {
  const { _get, _post } = useHttp()
  const { DEBUG } = useSettings()

  const SERVER_BASE_URL = (DEBUG) ? "http://localhost:8200" : "https://gl9dtt.deta.dev"

  const getStripePublishableKey = async () => { 
    let { stripePublishableKey } = await (await _get(`${SERVER_BASE_URL}/config`)).data
    return stripePublishableKey
  }

  const getSecretKey = async (stake: number) => {
    const data = JSON.stringify({ stake })
    const headers = { "Content-Type": "application/json" }
    let res = await (await _post(`${SERVER_BASE_URL}/make-payment`, data, headers)).data
    return res.clientSecret
  }

  return {
    getStripePublishableKey,
    getSecretKey
  }
}

export default useApi