import "./CityDetailCard.css"

const CityDetailCard = ( {city} ) => {
  
  return (
    <div className="city-card">
      <div className="city-card-image" style={{ backgroundImage: `url(${city.imageUrl})` }}>
        <p className="city-card-image-text">{city.name}</p>
      </div>
      <div className="city-card-details">
        <h3 className="city-card-details-main">{city.country}</h3>
        <p className="city-card-details-plain">Timezone: {city.timezone}</p>
        <p className="city-card-details-plain">Population: {city.population.toLocaleString()}</p>
        <p className="city-card-details-plain">Official language: {city.officialLanguage}</p>
        <p className="city-card-details-plain">Currency: {city.currency}</p>
        <h3 className="city-card-details-main">WHAT TO SEE</h3>
        <ul>
          {city.sights.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CityDetailCard;
