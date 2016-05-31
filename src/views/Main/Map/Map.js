import React, { PropTypes as T } from 'react'
import classnames from 'classnames'
import Map, { Marker } from 'google-maps-react'

import styles from './styles.module.css'

export class MapComponent extends React.Component {
  renderMarkers() {
    if (!this.props.places) { return; }
    return this.props.places.map(place => {
      return <Marker key={place.id}
        name={place.id}
        place={place}
        label={place.name}
        map={this.props.map}
        onClick={this.props.onMarkerClick.bind(this)}
        position={place.geometry.location}
        />
    });
  }

  renderChildren() {
    const {children} = this.props;

    if (React.Children.count(children) > 0) {
      return React.Children.map(children, child => {
        return React.cloneElement(child, this.props, {
          map: this.props.map,
          google: this.props.google,
        });
      });
    }
    return this.renderMarkers();
  }

  render() {
    const {children} = this.props;
    return (
      <Map google={this.props.google}
        map={this.props.map}
        className={styles.map}
        onClick={this.props.onClick}
        visible={!children || React.Children.count(children) === 0}>
        {this.renderChildren()}
      </Map>
    );
  }
};

MapComponent.PropTypes = {
  onMarkerClick: T.func,
};
const identity = (...a) => a;
MapComponent.defaultProps = {
  onMarkerClick: identity,
};

export default MapComponent;
