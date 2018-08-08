const axios = require('axios');
const config = require('../../config/index');

const URL = `${config.esWrapperUrl}/location`;

module.exports = {
  ipGeocode(ipAddress) {
    const params = {
      'include[]': 'regions',
      _strategy: 'containing', // @Note: This will change in the future
    };

    // set ip address param if provided by caller and filter out localhost ipv6 (::1)
    if (ipAddress && ipAddress !== '::1') {
      params.ip_address = ipAddress;
    }
    return axios.get(URL, { params }).then(response => response.data.data);
  },
  regionBySlug(slug) {
    const params = {
      'include[]': 'regions',
      _strategy: 'containing', // @Note: This will change in the future
      region_slug: slug,
    };

    return axios.get(URL, { params }).then(response => response.data.data);
  },
};
