import React, { PropTypes as T } from 'react'
import Map, {GoogleApiWrapper} from 'google-maps-react'
import {searchNearby} from 'utils/googleApiHelpers'
import Header from 'components/Header/Header'
import Sidebar from 'components/Sidebar/Sidebar'

import styles from './styles.module.css'

export class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
      pagination: null,
    };
  }

  onReady(mapProps, map) {
    const {google} = this.props;
    const opts = {
      location: map.center,
      radius: '500',
      types: ['cafe'],
    };
    searchNearby(google, map, opts).then((results, pagination) => {
      this.setState({
        places: results,
        pagination,
      });
    }).catch((status, result) => {
      console.log(status);
      console.log('result', result);
    });
  }

  onMarkerClick(item) {
    const {place} = item;
    const {push} = this.context.router;
    push(`/map/detail/${place.place_id}`);
  }

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(
        this.props.children,
        {
          google: this.props.google,
          places: this.state.places,
          loaded: this.props.loaded,
          router: this.context.router,
          onMarkerClick: this.onMarkerClick.bind(this),
        }
      );
    }
    return (
      <Map onReady={this.onReady.bind(this)}
        google={this.props.google}
        visible={false}
        className={styles.wrapper}>
        <Header />
        <Sidebar
          title={'Restaurants'}
          onListItemClick={this.onMarkerClick.bind(this)}
          places={this.state.places}
        />
        <div className={styles.content}>
          {children}
        </div>
      </Map>
    );
  }
}

Container.contextTypes = {
  router: T.object,
};

export default GoogleApiWrapper({
  apiKey: __GAPI_KEY__
})(Container);
