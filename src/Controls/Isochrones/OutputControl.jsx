import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Segment, Grid, Header, Icon } from 'semantic-ui-react'

import { makeIsochronesRequest } from '../../actions/isochronesActions'
import OutputControlColumn from './OutputControlColumn'
import { VALHALLA_OSM_URL } from 'utils/valhalla'

class OutputControl extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    profile: PropTypes.string,
    activeTab: PropTypes.number,
    successful: PropTypes.bool,
    results: PropTypes.object
  }

  // necessary to calculate new routes the tab was changed from isochrone tab
  // need to do this every time, because "profile" is global (otherwise we would
  // calculate new when the profile was changed while being on the iso tab)
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps.activeTab === 1 && this.props.activeTab === 0) {
      nextProps.dispatch(makeIsochronesRequest())
    }
    if (nextProps.activeTab === 0) {
      return false
    }
    return true
  }

  render() {
    const { profile, successful } = this.props

    return (
      <Segment
        style={{ margin: '0 1rem', display: successful ? 'block' : 'none' }}>
        <Header as={'h5'}>
          <span>
            <Icon name={profile} />
          </span>
          <span>Isochrones</span>
        </Header>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <OutputControlColumn
                profile={profile}
                header={'OSM'}
                provider={VALHALLA_OSM_URL}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

const mapStateToProps = state => {
  const { profile, activeTab } = state.common
  const { successful, results } = state.isochrones
  return {
    profile,
    activeTab,
    successful,
    results
  }
}

export default connect(mapStateToProps)(OutputControl)