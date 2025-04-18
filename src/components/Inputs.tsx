import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { HiOutlineLocationMarker } from 'react-icons/hi'

interface InputsTypes {
  setQuery: Function
  units: string
  setUnits: Function
}

function Inputs({ setQuery, units, setUnits }: InputsTypes) {
  const [city, setCity] = useState('')

  const handleUnitsChange = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    const selectedUnit = e.currentTarget.name
    if (units !== selectedUnit) setUnits(selectedUnit)
  }

  const handleSearchClick = () => {
    if (city !== '') setQuery({ q: city })
  }

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        setQuery({
          lat,
          lon
        })
      })
    }
  }

  return (
    <div className='flex flex-row justify-center my-6'>
      <div className='flex flex-row w-3/4 items-center justify-center'>
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type='text'
          placeholder='بحث عن مدينة...'
          className='mx-3 text-base sm:text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase'
        />
        <FiSearch
          size={30}
          className='mx-3 text-white cursor-pointer transition ease-out hover:scale-125'
          onClick={handleSearchClick}
        />
        <HiOutlineLocationMarker
          size={30}
          className='mx-3 text-white cursor-pointer transition ease-out hover:scale-125'
          onClick={handleLocationClick}
        />
      </div>

      <div className='flex flex-row w-1/4 items-center justify-center'>
        <button
          name='metric'
          className='text-xl text-white font-light transition ease-out hover:scale-125'
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className='text-xl text-white mx-1'>|</p>
        <button
          name='imperial'
          className='text-xl text-white font-light transition ease-out hover:scale-125'
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  )
}

export default Inputs
