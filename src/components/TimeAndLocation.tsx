import { formatToLocalTime } from '../services/weatherService'

interface TimeAndLocationTypes {
  weather: {
    dt: number
    timezone: string
    city_name: string
    country: string
  }
}

function TimeAndLocation({
  weather: { dt, timezone, city_name, country }
}: TimeAndLocationTypes) {
  return (
    <div>
      <div className='flex items-center justify-center my-6'>
        <p className='text-white text-md sm:text-xl font-extralight'>
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>

      <div className='flex items-center justify-center my-3'>
        <p className='text-white text-xl sm:text-3xl font-medium'>{`${city_name}`}</p>
      </div>
    </div>
  )
}

export default TimeAndLocation
