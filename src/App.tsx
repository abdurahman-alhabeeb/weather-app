import './App.css'
import TopButtons from './components/TopButtons'
import Inputs from './components/Inputs'
import TimeAndLocation from './components/TimeAndLocation'
import TemperatureAndDetails from './components/TemperatureAndDetails'
import getFormattedWeatherData from './services/weatherService'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const data = {
  dt: Date.now(),
  timezone: '',
  city_name: '',
  country: '',
  temp: 40,
  description: '',
  icon: '',
  temp_min: 40,
  temp_max: 40,
  sunrise: Date.now(),
  sunset: Date.now(),
  speed: 1.0,
  humidity: 50,
  feels_like: 40
}

function App() {
  const [query, setQuery] = useState({ q: 'الرياض' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(data)

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : '.الموقع الحالي'

      const id = toast.loading('جلب معلومات الطقس في ' + message, {
        type: toast.TYPE.INFO
      })

      try {
        await getFormattedWeatherData({ ...query, units }).then((data) => {
          toast.update(id, {
            render: `تم جلب معلومات الطقس في ${data.city_name}.`,
            type: 'success',
            isLoading: false,
            autoClose: 3000,
            progress: undefined
          })

          console.log(data)
          setWeather(data)
        })
      } catch (error) {
        toast.update(id, {
          render: (
            <>
              حدث خطأ
              <div>تأكد من إسم المدينة أو الاتصال بالإنترنت</div>
            </>
          ),
          type: 'error',
          isLoading: false,
          autoClose: 3000,
          progress: undefined
        })
      }
    }

    fetchWeather()
  }, [query, units])

  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700'
    const threshold = units === 'metric' ? 20 : 60
    if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700'

    return 'from-yellow-700 to-orange-700'
  }

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-2 sm:px-8 md:px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
        </div>
      )}

      <ToastContainer theme='colored' newestOnTop={true} rtl />
    </div>
  )
}

export default App
