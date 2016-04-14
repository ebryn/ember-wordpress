import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
	isNewSerializerAPI: true,

	// Here we wrap the payload in a named object after the model type
	// because this is what Ember expects { post: { datahere } }
	normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
		var payloadTemp = {};
		payloadTemp[primaryModelClass.modelName] = [payload];

		return this._super(store, primaryModelClass, payloadTemp, id, requestType);
	},

	normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
		if (primaryModelClass.modelName === 'user') {
			if (!payload.links) { payload.links = {}; }
			let adapter = store.adapterFor(primaryModelClass.modelName);
			let postQueryUrl = adapter.urlForQuery({author: payload.id}, 'post');
			payload.links.posts = `${postQueryUrl}?author=${payload.id}`;
		}

		return this._super(...arguments);
	},

	// Then, we can deal with our missing root element when extracting arrays from the JSON.
	normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
		const newPayload = {};
		const rootKey = Ember.String.pluralize(primaryModelClass.modelName);

		newPayload[rootKey] = payload.data;
		newPayload.meta = payload.meta;

		return this._super(store, primaryModelClass, newPayload, id, requestType);
	},

	normalize(modelClass, resourceHash, prop) {
		// As you get bored typing `title.rendered`, here we move the `rendered` part up.
		if (resourceHash.content && resourceHash.title.rendered) {
			resourceHash.content = resourceHash.content.rendered;
			resourceHash.title = resourceHash.title.rendered;
		}
		if (resourceHash.title && resourceHash.title.rendered) {
			resourceHash.title = resourceHash.title.rendered;
		}
		if (resourceHash.excerpt && resourceHash.excerpt.rendered) {
			resourceHash.excerpt = resourceHash.excerpt.rendered;
		}
		return this._super(modelClass, resourceHash, prop);
	}
});
