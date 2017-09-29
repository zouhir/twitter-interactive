/**
 * @module: UI Component
 * @name: Map
 * @description: Full screen map with pins
 *
 * @developer: Zouhir Chahoud - 11763745
 */


/**
 * For more information about mapbox please refer to:
 * https://www.mapbox.com/
 */

import { h, Component } from 'preact'
import MapGL, {Marker, Popup, NavigationControl} from 'react-map-gl';
import {MAP_STYLE as defaultMapStyle} from '../../mapbox.json';

import style from './style'

export default class App extends Component {
  state = {
    mapStyle: defaultMapStyle,
    viewport: {
      latitude: 40,
      longitude: -100,
      zoom: 3,
      bearing: 0,
      pitch: 0,
      width: 500,
      height: 500
    },
    popupInfo: null
  }
  componentDidMount() {
    window.addEventListener('resize', this._resize);
    this._resize();
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this._resize);
  }

  _onViewportChange = viewport => this.setState({viewport});
  
  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  };

  _renderCityMarker = (tweet, index) => {
    return (
      <Marker key={`marker-${index}`}
              longitude={+tweet.coordinates.longitude}
              latitude={+tweet.coordinates.latitude} >
          <div className={`${style.pin} ${style[tweet.type]}`} />
          <div className={style.pulse} />
      </Marker>
    );
  }
  
  render (props, state) {
    let { viewport } = state
    let { tweets } = props
    return (
      <div>
        <MapGL
          mapStyle="mapbox://styles/zouhirc/cj7swxi2q0uf42sml8nec3v1l"
          {...viewport}
          onViewportChange={this._onViewportChange}
        >
          { tweets.map(this._renderCityMarker) }
        </MapGL>
      </div>
    )
  }
}
