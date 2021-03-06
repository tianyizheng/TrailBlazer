import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Slider from 'material-ui/Slider'
import Checkbox from 'material-ui/Checkbox'
import InputRange from 'react-input-range'
import './inputRange.css'
import { PaperForm, AutocompleteLocation } from './'

class Form extends Component {
  handleSubmitClick() {
    // Check validation
    // Only beginLocation is required to be changed
    if (this.props.beginLocation.coords.length !== 2) {
      this.props.setBeginValidity(false)
    } else {
      this.props.sendForm(
        this.props.beginLocation.coords,
        this.props.distance.selection,
        this.props.pois.selected ? this.props.pois.value : 0,
        this.props.tracks.selected ? this.props.tracks.value : 0
      )
    }
  }

  render() {
    if (this.props.beginLocation.setMode) {
      return (
        <div style={{ width: '80%' }}>
          <PaperForm title="Settings">
            <div style={{ ...styles.inputContainer, marginTop: '-10px' }}>
              <div style={{ display: 'flex', flex: 1 }}>
                <AutocompleteLocation
                  floatingLabelText="Begin location"
                  dataSource={this.props.beginLocation.predictions.map(
                    d => d.description
                  )}
                  onUpdateInput={v => this.props.getBeginPredictions(v)}
                  onNewRequest={(k, i) =>
                    this.props.getBeginPlaceDetails(
                      this.props.beginLocation.predictions[i].place_id
                    )
                  }
                  loading={this.props.beginLocation.loading}
                  done={this.props.beginLocation.coords.length !== 0}
                  onLocationClick={() => this.props.setSetModeCancel()}
                  setMode={this.props.beginLocation.setMode}
                  searchText={this.props.beginLocation.text}
                />
              </div>
            </div>
          </PaperForm>
        </div>
      )
    } else {
      return (
        <div style={{ width: '80%' }}>
          <PaperForm
            title="Settings"
            btn={{
              label: 'Back to welcome screen',
              onClick: () => this.props.setWelcomeMode()
            }}
          >
            <div style={{ ...styles.inputContainer, marginTop: '-10px' }}>
              <div
                style={{
                  marginRight: '30px',
                  display: 'flex',
                  flex: 1,
                  marginBottom: '5px'
                }}
              >
                <AutocompleteLocation
                  floatingLabelText="Begin location"
                  dataSource={this.props.beginLocation.predictions.map(
                    d => d.description
                  )}
                  onUpdateInput={v => this.props.getBeginPredictions(v)}
                  onNewRequest={(k, i) =>
                    this.props.getBeginPlaceDetails(
                      this.props.beginLocation.predictions[i].place_id
                    )
                  }
                  loading={this.props.beginLocation.loading}
                  done={this.props.beginLocation.coords.length !== 0}
                  onLocationClick={() => this.props.setSetModeOn()}
                  setMode={this.props.beginLocation.setMode}
                  searchText={this.props.beginLocation.text}
                  errorText={
                    !this.props.beginLocation.validity
                      ? 'Valid begin location is required'
                      : ''
                  }
                />
              </div>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  marginRight: '20px',
                  marginLeft: '30px',
                  marginTop: '30px'
                }}
              >
                <span
                  style={{
                    fontSize: '16px',
                    color: 'black',
                    opacity: '0.87',
                    marginRight: '30px'
                  }}
                >
                  Distance
                </span>
                <div style={{ flex: 3 }}>
                  <InputRange
                    draggableTrack
                    maxValue={this.props.distance.max}
                    minValue={this.props.distance.min}
                    onChange={value => this.props.setDistanceRange(value)}
                    value={this.props.distance.selection}
                    formatLabel={value => `${value} km`}
                  />
                </div>
              </div>
            </div>
            <div style={styles.inputContainer}>
              <div style={{ flex: 1, marginRight: '30px' }}>
                <Checkbox
                  label="POI information from Geocaching"
                  checked={this.props.pois.selected}
                  style={styles.checkbox}
                  onCheck={(e, b) => this.props.setPoisState(b)}
                  labelStyle={styles.checkboxLabel}
                />
              </div>
              <div
                style={{
                  flex: 1
                }}
              >
                {this.props.pois.selected && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span style={{ flex: 1 }} className="input-range__label">
                      Not that important
                    </span>
                    <div
                      style={{
                        flex: 3,
                        marginTop: '-24px',
                        marginBottom: '-48px',
                        marginLeft: '15px',
                        marginRight: '15px'
                      }}
                    >
                      <Slider
                        value={this.props.pois.value}
                        min={this.props.pois.min}
                        max={this.props.pois.max}
                        onChange={(e, v) => this.props.setPoisValue(v)}
                      />
                    </div>
                    <span style={{ flex: 1 }} className="input-range__label">
                      Very important!
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div style={styles.inputContainer}>
              <div style={{ flex: 1, marginRight: '30px' }}>
                <Checkbox
                  label="Tracks information from Utagawa"
                  checked={this.props.tracks.selected}
                  style={styles.checkbox}
                  labelStyle={styles.checkboxLabel}
                  onCheck={(e, b) => this.props.setTracksState(b)}
                />
              </div>
              <div
                style={{
                  flex: 1
                }}
              >
                {this.props.tracks.selected && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span style={{ flex: 1 }} className="input-range__label">
                      Not that important
                    </span>
                    <div
                      style={{
                        flex: 3,
                        marginTop: '-24px',
                        marginBottom: '-48px',
                        marginLeft: '15px',
                        marginRight: '15px'
                      }}
                    >
                      <Slider
                        value={this.props.tracks.value}
                        min={this.props.tracks.min}
                        max={this.props.tracks.max}
                        onChange={(e, v) => this.props.setTracksValue(v)}
                      />
                    </div>
                    <span style={{ flex: 1 }} className="input-range__label">
                      Very important!
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div style={styles.buttonContainer}>
              <div style={{ marginRight: '15px', marginLeft: '5px' }}>
                <RaisedButton
                  label="Reset"
                  secondary
                  onClick={() => this.props.resetForm()}
                />
              </div>
              <div style={{ marginLeft: '15px' }}>
                <RaisedButton
                  label="Submit"
                  primary
                  onClick={() => this.handleSubmitClick.bind(this)()}
                />
              </div>
            </div>
          </PaperForm>
        </div>
      )
    }
  }
}

const styles = {
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '20px',
    marginBottom: '20px',
    marginRight: '5px',
    marginLeft: '5px'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  iconDone: {
    color: 'rgb(0, 188, 212)',
    opacity: 1
  },
  checkbox: {
    marginBottom: '15px'
  },
  checkboxLabel: {
    color: 'black',
    opacity: 0.87
  }
}

export { Form }
