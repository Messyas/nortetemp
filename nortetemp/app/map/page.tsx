const MapPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6">Mapa Meteorológico</h1>
      <iframe
        width="100%"
        height="600"
        src="https://embed.windy.com/embed2.html?lat=-3.1&lon=-60.025&zoom=10&level=surface&overlay=rain&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=-3.1&detailLon=-60.025&metricWind=default&metricTemp=default&radarRange=">
      </iframe>
    </div>
  );
};

export default MapPage;
