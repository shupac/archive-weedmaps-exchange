import { mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import GeoJson from './geo-json';
import MapContext from './context';

describe('geojson map component', () => {
  let wrapper;
  let mockMap;
  let element;
  beforeEach(() => {
    mockMap = {
      getSource: () => false,
      getLayer: () => false,
      addSource: jest.fn(),
      addLayer: jest.fn(),
      removeLayer: jest.fn(),
      on: (event, target, cb) => {
        // fire immediately
        try {
          target();
        } catch (e) {
          if (cb) {
            cb();
          }
        }
      },
      off: jest.fn(),
      setPaintProperty: jest.fn(),
    };
    element = (
      <MapContext.Provider value={null}>
        <GeoJson
          fill="#fff"
          outline="#333"
          opacity={0.8}
          label="Irvine"
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
      </MapContext.Provider>
    );
  });

  it('will call the click handler', () => {
    const click = jest.fn();
    wrapper = mount(
      <GeoJson
        onClick={click}
        fill="#fff"
        outline="#333"
        opacity={0.8}
        label="Irvine"
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
      />,
    );
    wrapper.instance().onLayerClick();
    expect(click).toHaveBeenCalled();
  });

  it('will add the geojson layer', () => {
    wrapper = mount(element);
    wrapper.setProps({ value: mockMap });
    // Extract the dynamic layer key
    const layerKey = mockMap.addSource.mock.calls[0][0].replace('-source', '');
    expect(mockMap.addSource).toHaveBeenCalledWith(expect.any(String), {
      data: {
        geometry: {
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
          type: 'Polygon',
        },
        properties: { title: 'Irvine' },
        type: 'Feature',
      },
      type: 'geojson',
    });

    expect(mockMap.addLayer).toHaveBeenCalledWith({
      id: layerKey,
      paint: {
        'fill-color': '#fff',
        'fill-opacity': 0.8,
        'fill-outline-color': '#333',
      },
      source: `${layerKey}-source`,
      type: 'fill',
    });
  });

  it('will add a label layer', () => {
    wrapper = mount(element);
    wrapper.setProps({ value: mockMap });
    // Extract the dynamic layer key
    const layerKey = mockMap.addSource.mock.calls[0][0].replace('-source', '');
    expect(mockMap.addLayer).toHaveBeenCalledWith({
      id: `${layerKey}-symbols`,
      type: 'symbol',
      source: `${layerKey}-source`,
      layout: {
        'symbol-placement': 'point',
        'text-field': '{title}',
        'text-size': 16,
      },
    });
  });

  it('will update the layer color on prop change', () => {
    wrapper = TestRenderer.create(element);
    wrapper.update(
      <MapContext.Provider value={mockMap}>
        <GeoJson
          fill="#ccc"
          outline="#333"
          opacity={0.8}
          label="Irvine"
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
      </MapContext.Provider>,
    );

    expect(mockMap.setPaintProperty).toHaveBeenCalledWith(
      expect.any(String),
      'fill-color',
      '#ccc',
    );
  });

  it('will update the outline color on prop change', () => {
    wrapper = TestRenderer.create(element);
    wrapper.update(
      <MapContext.Provider value={mockMap}>
        <GeoJson
          fill="#ccc"
          outline="#444"
          opacity={0.8}
          label="Irvine"
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
      </MapContext.Provider>,
    );

    expect(mockMap.setPaintProperty).toHaveBeenCalledWith(
      expect.any(String),
      'fill-outline-color',
      '#444',
    );
  });

  it('will update the layer opacity on prop change', () => {
    wrapper = TestRenderer.create(element);
    wrapper.update(
      <MapContext.Provider value={mockMap}>
        <GeoJson
          fill="#fff"
          outline="#333"
          opacity={0.9}
          label="Irvine"
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
      </MapContext.Provider>,
    );

    expect(mockMap.setPaintProperty).toHaveBeenCalledWith(
      expect.any(String),
      'fill-opacity',
      0.9,
    );
  });

  it('will setup the load handler on the map becoming available', () => {
    wrapper = mount(element);
    wrapper.setProps({ value: mockMap });
    expect(wrapper.instance().disposeLoadHandler).toBeDefined();
  });

  it('will setup the click handler on the map becoming available', () => {
    wrapper = mount(element);
    wrapper.setProps({ value: mockMap });
    expect(wrapper.instance().disposeClickHandler).toBeDefined();
  });

  it('will clean up after itself on unmounting', () => {
    wrapper = mount(element);
    wrapper.setProps({
      value: {
        ...mockMap,
        getSource: jest.fn(),
        getLayer: jest.fn(),
      },
    });
    wrapper.unmount();
    expect(mockMap.off).toHaveBeenCalledWith('load', expect.any(Function));
    expect(mockMap.off).toHaveBeenCalledWith(
      'click',
      expect.any(String),
      expect.any(Function),
    );
  });
});
