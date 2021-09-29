import './App.css';
import CurrentLocation from "./Geolocation/CurrentLocation";
import LibararyLocation from "./ManyMarker/LibraryLocation";

function App() {
  return (
    <div className="App">
      <body>
        <div id="map">
          {/* <CurrentLocation /> */}
          <LibararyLocation />
        </div>
      </body>
    </div>
  );
}

export default App;
