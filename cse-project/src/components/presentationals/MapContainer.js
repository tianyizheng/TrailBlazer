import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { closestPointIndexInList } from '../../utils'

class MapContainer extends Component {
  state = {
    zoom: 16
  }

  handlePolylineMouseOver = (track, lat, lng) => {
    if (this.props.currentTrackId !== track.id) {
      this.props.setCurrentTrack(track.id)
    }
    this.props.setCurrentClosestPointIndexInCurrentTrack(
      closestPointIndexInList([lat, lng], track.points)
    )
  }

  handlePolylineMouseOut = e => {
    // TODO: keep that one ?
    //this.props.setCurrentTrack(undefined)
  }

  renderPolyline(p) {
    if (this.props.currentTrackId) {
      if (this.props.currentTrackId === p.id) {
        if (this.props.closestCurrentPointIndexInCurrentTrack) {
          return (
            <div>
              <Polyline
                onMouseOver={e =>
                  this.handlePolylineMouseOver(p, e.latlng.lat, e.latlng.lng)}
                onMouseOut={e => this.handlePolylineMouseOut()}
                color={p.color}
                opacity={1}
                positions={p.points.slice(
                  0,
                  this.props.closestCurrentPointIndexInCurrentTrack + 1
                )}
              />
              <Polyline
                onMouseOver={e =>
                  this.handlePolylineMouseOver(p, e.latlng.lat, e.latlng.lng)}
                onMouseOut={e => this.handlePolylineMouseOut()}
                color={p.color}
                opacity={0.5}
                positions={p.points.slice(
                  this.props.closestCurrentPointIndexInCurrentTrack,
                  p.points.length
                )}
              />
            </div>
          )
        } else {
          return (
            <Polyline
              onMouseOut={e => this.handlePolylineMouseOut()}
              onMouseOver={e =>
                this.handlePolylineMouseOver(p, e.latlng.lat, e.latlng.lng)}
              color={p.color}
              opacity={1}
              positions={p.points}
            />
          )
        }
      } else {
        return (
          <Polyline
            onMouseOut={e => this.handlePolylineMouseOut()}
            onMouseOver={e =>
              this.handlePolylineMouseOver(p, e.latlng.lat, e.latlng.lng)}
            color={p.color}
            opacity={0.4}
            positions={p.points}
          />
        )
      }
    } else {
      return (
        <Polyline
          onMouseOut={e => this.handlePolylineMouseOut()}
          onMouseOver={e =>
            this.handlePolylineMouseOver(p, e.latlng.lat, e.latlng.lng)}
          color={p.color}
          opacity={1}
          positions={p.points}
        />
      )
    }
  }

  render() {
    const position = [45.175847, 5.539675]

    return (
      <Map center={position} zoom={this.state.zoom} ref="map">
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {this.props.tracks.map((p, i) => {
          if (p.displayed) {
            return (
              <div key={i}>
                <Marker position={p.points[0]}>
                  <Popup>
                    <span style={styles.startUpTitle}>{p.name}</span>
                  </Popup>
                </Marker>
                {p.pois.map((poi, j) => (
                  <Marker
                    position={poi.coords}
                    title={poi.name}
                    opacity={0.5}
                    key={poi.id}
                    className="class"
                  >
                    <Popup>
                      <span>
                        <span style={styles.POIPopupTitle}>{poi.name}</span>
                        <br />
                        <span style={styles.POIPopupDescription}>
                          {poi.description}
                        </span>
                      </span>
                    </Popup>
                  </Marker>
                ))}
                {this.renderPolyline.bind(this)(p)}
              </div>
            )
          }
        })}
      </Map>
    )
  }
}

const styles = {
  startUpTitle: {
    color: 'black',
    opacity: 0.87,
    size: '14pt',
    fontWeight: 'bold'
  },
  POIPopupTitle: {
    color: 'black',
    opacity: 0.87,
    size: '14pt',
    fontWeight: 'bold'
  },
  POIPopupDescription: {
    color: 'black',
    opacity: 0.54,
    size: '12pt'
  }
}

export { MapContainer }
