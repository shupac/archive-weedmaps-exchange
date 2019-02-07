import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import { action } from '@storybook/addon-actions';
import StateComponent from 'react-component-component';
import { type Point } from 'lib/geo';
import Map from './index';
import GeoJson from './geo-json';

const ResponsiveMap = styled(Map)`
  height: 100vh;
  width: 100vw;
`;

const FixedSize = styled(Map)`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
`;

export default storiesOf('Map', module)
  .add('Responsive', () => <ResponsiveMap />)
  .add('Fixed Size', () => <FixedSize height={500} width={500} />)
  .add('Custom Center', () => (
    <ResponsiveMap center={[-111.023889, 32.1561235]} />
  ))
  .add('With Zoom and Move Handlers', () => (
    <ResponsiveMap
      onMoveEnd={(bounds, event) => {
        action('Map Moved')(bounds, event);
      }}
    />
  ))
  .add('With GeoJsonLayers', () => (
    <StateComponent initialState={{ fill: '#00CDBE', opacity: 0.5 }}>
      {({ state, setState }) => (
        <ResponsiveMap fit>
          <GeoJson
            fill="#fff"
            outline="#333"
            opacity={state.opacity}
            label="Irvine"
            geometry={{
              type: 'Polygon',
              coordinates: ([
                [
                  [-117.7621078491211, 33.65263724181318],
                  [-117.74906158447266, 33.68121111121435],
                  [-117.72537231445312, 33.70691947669435],
                  [-117.77721405029297, 33.748893261983575],
                  [-117.80948638916016, 33.75060604160645],
                  [-117.86888122558592, 33.688924428426475],
                  [-117.7621078491211, 33.65263724181318],
                ],
              ]: Point[][]),
            }}
          />
          <GeoJson
            fill="#fff"
            outline="#333"
            opacity={state.opacity}
            label="South Santa Ana"
            geometry={{
              type: 'Polygon',
              coordinates: ([
                [
                  [-117.9045867919922, 33.75574417520175],
                  [-117.93651580810547, 33.69492319661598],
                  [-117.90733337402344, 33.68578204940791],
                  [-117.86956787109374, 33.68749608856894],
                  [-117.84519195556639, 33.71805737954357],
                  [-117.9045867919922, 33.75574417520175],
                ],
              ]: Point[][]),
            }}
          />
          <GeoJson
            onClick={e => {
              action('clicked layer')(e);
              setState({ fill: state.fill === '#fff' ? '#00CDBE' : '#fff' });
            }}
            fill={state.fill}
            outline="#333"
            opacity={state.opacity}
            label="North Santa Ana"
            geometry={{
              type: 'Polygon',
              coordinates: ([
                [
                  [-117.81051635742186, 33.75146241858857],
                  [-117.7906036376953, 33.77172751039999],
                  [-117.8287124633789, 33.793699728538805],
                  [-117.88570404052734, 33.7797180601201],
                  [-117.90355682373047, 33.755458731413476],
                  [-117.84450531005858, 33.71834294779959],
                  [-117.81051635742186, 33.75146241858857],
                ],
              ]: Point[][]),
            }}
          />
        </ResponsiveMap>
      )}
    </StateComponent>
  ));
