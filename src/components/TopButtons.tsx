function TopButtons({ setQuery }: { setQuery: Function }) {
  const cities = [
    {
      id: 1,
      title: 'الرياض'
    },
    {
      id: 2,
      title: 'مكة'
    },
    {
      id: 4,
      title: 'جدة'
    },
    {
      id: 3,
      title: 'المدينة المنورة'
    },
    {
      id: 5,
      title: 'تبوك'
    }
  ]

  return (
    <div className='flex items-center justify-around my-6'>
      {cities.map((city) => (
        <button
          key={city.id}
          className='text-white text-sm sm:text-lg font-medium'
          onClick={() => setQuery({ q: city.title })}
        >
          {city.title}
        </button>
      ))}
    </div>
  )
}

export default TopButtons
