import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { PaperForm } from './'

class GlobalTrackInfo extends Component {
  handleDownloadGPXClick = () => {
    this.props.downloadGPX(this.props.track)
  }

  render() {
    if (this.props.track) {
      return (
        <PaperForm title="Toolbox">
          <div style={styles.container}>
            <RaisedButton
              label={this.props.gpx.loading ? 'Loading ...' : 'Download GPX'}
              disabled={this.props.gpx.loading}
              primary={true}
              labelStyle={
                this.props.gpx.loading
                  ? {
                      paddingRight: '32px',
                      paddingLeft: '32px'
                    }
                  : {}
              }
              onClick={() => this.handleDownloadGPXClick.bind(this)()}
            />
          </div>
        </PaperForm>
      )
    } else {
      return null
    }
  }
}

const styles = {
  container: {}
}

export { GlobalTrackInfo }
