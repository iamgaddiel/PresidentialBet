import { Preferences } from "@capacitor/preferences"

const useStorage = () => {

    const storeItem = async (key: string, data: {}) => {
        const stringifiedData = JSON.stringify(data)
        await Preferences.set({ key, value: stringifiedData})
    }

    const getItem = async (key: string) => {
        const { value } = await Preferences.get({ key })
        if ( value !== null) return JSON.parse(value);
        return null
    }

    const clearItems = () => Preferences.clear()

    return {
        getItem,
        storeItem,
        clearItems
    }
}

export default useStorage