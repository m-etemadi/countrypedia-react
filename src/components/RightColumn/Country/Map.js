import { useCountries } from '../../../context/CountriesContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function Map() {
  const {
    selectedCountry: { coords, commonName },
  } = useCountries();
  const location = [coords.lat, coords.lng];
  const zoom = 5;

  return (
    <article className="data orange no-padding">
      <MapContainer
        className="data__row-map"
        center={[location.at(0), location.at(1)]}
        zoom={zoom}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[location.at(0), location.at(1)]}>
          <Popup>Map of {commonName}</Popup>
        </Marker>
      </MapContainer>
    </article>
  );
}

export default Map;
