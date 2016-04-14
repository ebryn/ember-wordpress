import DS from 'ember-data';
import config from 'ember-get-config';

// The WP API requires a rest adapter.
export default DS.RESTAdapter.extend({
	host: config.wordpressHost,
	// This is the default namespace for WP API v2.
	namespace: 'wp-json/wp/v2',

	handleResponse(status, headers, payload, requestData) {
		// Wordpress sends the 'meta' data (useful for pagination) in the GET requests headers.
		// Here we move it into a `meta` property like Ember expects.
		let newPayload = payload;

		if (Ember.typeOf(payload) === 'array') {
			const meta = {
				total: parseInt(headers['X-Wp-Total'], 10),
				totalPages: parseInt(headers['X-Wp-Totalpages'], 10)
			};

			newPayload = {
				data: payload,
				meta: meta
			}
		}
		return this._super(status, headers, newPayload, requestData);
	}
});
