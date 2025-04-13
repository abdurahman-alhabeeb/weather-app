import { DateTime } from 'luxon'

const API_KEY = 'b8d665ec61b97090426cd0e81556065f'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'
const GEO_CORD = 'https://api.openweathermap.org/geo/1.0/reverse'

const getWeatherData = (infoType: string, searchParams: any) => {
  const url = new URL(BASE_URL + '/' + infoType)
  url.search = new URLSearchParams({
    ...searchParams,
    appid: API_KEY,
    lang: 'ar'
  }).toString()
  return fetch(url).then((res) => res.json())
}

const formatCurrentWeather = (data: any, cityName: any) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone
  } = data

  const { description, icon } = weather[0]

  const city_name = cityName || name
  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    city_name,
    dt,
    country,
    sunrise,
    sunset,
    description,
    icon,
    speed,
    timezone
  }
}

const getFormattedWeatherData = async (searchParams: any) => {
  let cityName = ''

  if (searchParams.lat) {
    const searchURL = new URL(GEO_CORD)

    searchURL.search = new URLSearchParams({
      ...searchParams,
      appid: API_KEY,
      lang: 'ar'
    }).toString()

    const res = await fetch(searchURL)
    const data = await res.json()
    cityName = data[0].local_names.ar
  }

  const formattedCurrentWeather = await getWeatherData(
    'weather',
    searchParams
  ).then((data) => formatCurrentWeather(data, cityName))

  return {
    ...formattedCurrentWeather
  }
}

const formatToLocalTime = (
  secs: number,
  zone: string,
  format = "cccc, dd LLL yyyy' | الوقت المحلي: 'hh:mm a"
) => {
  return DateTime.fromSeconds(secs).toFormat(format, { locale: 'ar' })
}

const iconUrlFromCode = (code: string) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormattedWeatherData

export { formatToLocalTime, iconUrlFromCode }
