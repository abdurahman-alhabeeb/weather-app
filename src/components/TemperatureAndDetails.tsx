import { BsWind, BsThermometerHigh } from 'react-icons/bs'
import { BiDroplet } from 'react-icons/bi'
import { FiSun } from 'react-icons/fi'
import { TbSunset2 } from 'react-icons/tb'
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService'
import { log } from 'console'

interface TemperatureAndDetailsTypes {
  weather: {
    description: string
    icon: string
    temp: number
    temp_min: number
    temp_max: number
    sunrise: number
    sunset: number
    speed: number
    humidity: number
    feels_like: number
    timezone: string
  }
}

function TemperatureAndDetails({
  weather: {
    description,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone
  }
}: TemperatureAndDetailsTypes) {
  return (
    <div>
      <div className='flex items-center justify-center py-6 text-base sm:text-xl text-cyan-300'>
        <p>{description}</p>
      </div>

      <div className='flex flex-row items-center justify-between text-white py-3'>
        <div className='flex flex-col space-y-2 w-1/3'>
          <div className='flex font-light text-xs sm:text-sm '>
            <BsThermometerHigh size={18} className='w-2/7' />
            <p className='w-4/7 mx-1'>الحرارة الملموسة:</p>
            <p className='font-medium w-1/7'>{`${feels_like.toFixed()}°`}</p>
          </div>
          <div className='flex font-light text-sm '>
            <BiDroplet size={18} className='w-2/7' />
            <p className='w-4/7 mx-1'>الرطوبة:</p>
            <p className='font-medium  w-1/7'>{`${humidity.toFixed()}%`}</p>
          </div>
          <div className='flex font-light text-sm '>
            <BsWind size={18} className='w-2/7' />
            <p className='w-4/7 mx-1'>الرياح:</p>
            <p className='font-medium w-1/7'>{`${speed.toFixed()} كم/ساعة`}</p>
          </div>
        </div>
        <p className='text-3xl sm:text-5xl w-1/3'>{`${temp.toFixed()}°`}</p>
        <img src={iconUrlFromCode(icon)} alt='' className='w-12 sm:w-20' />
      </div>

      <div className='flex flex-row items-center justify-center space-x-1 text-white text-xs sm:text-sm py-3'>
        <FiSun className='ml-1' />
        <p className='font-light'>
          الشروق:{' '}
          <span className='font-medium ml-1'>
            {formatToLocalTime(sunrise, timezone, 'hh:mm a')}
          </span>
        </p>
        <p className='font-light'>|</p>

        <TbSunset2 />
        <p className='font-light'>
          الغروب:{' '}
          <span className='font-medium ml-1'>
            {formatToLocalTime(sunset, timezone, 'hh:mm a')}
          </span>
        </p>
        <p className='font-light'>|</p>

        <FiSun />
        <p className='font-light'>
          الكبرى:{' '}
          <span className='font-medium ml-1'>{`°${temp_max.toFixed()}`}</span>
        </p>
        <p className='font-light'>|</p>

        <FiSun />
        <p className='font-light'>
          الصغرى:{' '}
          <span className='font-medium ml-1'>{`°${temp_min.toFixed()}`}</span>
        </p>
      </div>
    </div>
  )
}

export default TemperatureAndDetails
