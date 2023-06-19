// // import React, { useState } from "react";
// // import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

// // export const MapComponent = ({ google }) => {
// //   const [location, setLocation] = useState("");
// //   const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

// //   const handleLocationChange = (event) => {
// //     setLocation(event.target.value);
// //   };

// //   const handleMapClick = (mapProps, map, clickEvent) => {
// //     const { latLng } = clickEvent;
// //     setMapCenter(latLng);
// //   };

// //   return (
// //     <div>
// //       <input
// //         type="text"
// //         placeholder="Enter your location"
// //         value={location}
// //         onChange={handleLocationChange}
// //       />
// //       <Map
// //         google={google}
// //         zoom={14}
// //         center={mapCenter}
// //         onClick={handleMapClick}>
// //         <Marker position={mapCenter} />
// //       </Map>
// //     </div>
// //   );
// // };

// // export default GoogleApiWrapper({
// //   apiKey: "AIzaSyDwIVgIMPOY0UMpmXrqO0hOBNSTM7dH2pA",
// // })(MapComponent);

// import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
// import { Component } from "react";

// export class MapContainer extends Component {
//   render() {
//     return (
//       <Map google={this.props.google} zoom={14}>
//         <Marker onClick={this.onMarkerClick} name={"Current location"} />

//         <InfoWindow onClose={this.onInfoWindowClose}>
//           <div>
//             <h1>hiii</h1>
//           </div>
//         </InfoWindow>
//       </Map>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   // apiKey: "AIzaSyDwIVgIMPOY0UMpmXrqO0hOBNSTM7dH2pA",
// })(MapContainer);
