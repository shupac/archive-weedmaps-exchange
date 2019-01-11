import { shallow } from 'enzyme';
import findByTestId from 'lib/jest/find-by-test-id';
import Map from './';
import GeoJson from './geo-json';

jest.mock('mapbox-gl');

describe('map', () => {
  let MapBox;
  beforeEach(() => {
    MapBox = require('mapbox-gl');
  });

  it('will setup the mapbox styles', () => {
    const wrapper = shallow(<Map />);
    const styleTag = findByTestId(wrapper, 'map-style-tag');
    expect(styleTag.length).toBe(1);
  });

  it('will provide the map via context', () => {
    const wrapper = shallow(<Map />);
    const mapProvider = findByTestId(wrapper, 'map-provider');
    expect(mapProvider.props().value).toBe(wrapper.instance().map);
  });

  describe('with an onMove handler', () => {
    it('will call the handler if the map moves', () => {
      const moveEndHandler = jest.fn();
      const mockEvent = {};
      const wrapper = shallow(<Map onMoveEnd={moveEndHandler} />);

      wrapper.instance().onMoveEnd(mockEvent);

      expect(moveEndHandler).toHaveBeenCalledWith(
        { ne: { lat: 33.29, lng: -117.25 }, sw: { lat: 33.97, lng: -116.23 } },
        mockEvent,
      );
    });
  });

  describe('when fitting children into view', () => {
    it('will call fitBounds on the map', () => {
      const wrapper = shallow(
        <Map fit>
          <GeoJson
            fill="#fff"
            opacity={0.8}
            label="Irvine"
            geometry={{
              type: 'Polygon',
              coordinates: [
                [
                  [-117.7621078491211, 33.65263724181318],
                  [-117.74906158447266, 33.68121111121435],
                  [-117.72537231445312, 33.70691947669435],
                  [-117.77721405029297, 33.748893261983575],
                  [-117.80948638916016, 33.75060604160645],
                  [-117.86888122558592, 33.688924428426475],
                  [-117.7621078491211, 33.65263724181318],
                ],
              ],
            }}
          />
          <GeoJson
            fill="#fff"
            opacity={0.8}
            label="South Santa Ana"
            geometry={{
              type: 'Polygon',
              coordinates: [
                [
                  [-117.9045867919922, 33.75574417520175],
                  [-117.93651580810547, 33.69492319661598],
                  [-117.90733337402344, 33.68578204940791],
                  [-117.86956787109374, 33.68749608856894],
                  [-117.84519195556639, 33.71805737954357],
                  [-117.9045867919922, 33.75574417520175],
                ],
              ],
            }}
          />
          <GeoJson
            fill="#fff"
            opacity={0.8}
            label="North Santa Ana"
            geometry={{
              type: 'Polygon',
              coordinates: [
                [
                  [-117.81051635742186, 33.75146241858857],
                  [-117.7906036376953, 33.77172751039999],
                  [-117.8287124633789, 33.793699728538805],
                  [-117.88570404052734, 33.7797180601201],
                  [-117.90355682373047, 33.755458731413476],
                  [-117.84450531005858, 33.71834294779959],
                  [-117.81051635742186, 33.75146241858857],
                ],
              ],
            }}
          />
        </Map>,
      );
      expect(wrapper.instance().map.fitBounds).toHaveBeenCalledWith(
        [
          [-117.93651580810547, 33.65263724181318],
          [-117.72537231445312, 33.793699728538805],
        ],
        { linear: true, padding: { bottom: 10, left: 10, right: 10, top: 10 } },
      );
    });
  });
  describe('with a center point', () => {
    it('will setup the map with the right center', () => {
      shallow(<Map center={[-111.023889, 32.1561235]} />);
      expect(MapBox.Map).toHaveBeenCalledWith({
        center: [-111.023889, 32.1561235],
        container: null,
        doubleClickZoom: false,
        maxZoom: 18,
        style: expect.any(String),
        zoom: 10,
      });
    });
  });
});
