import DS from 'ember-data';

const {Model, attr, hasMany, belongsTo} = DS;

export default Model.extend({
  acf: attr(),
  author: belongsTo('user', {async: true}),
  authorAvatarUrls: attr(),
  authorName: attr('string'),
  authorUrl: attr('string'),
  content: attr('string'),
  date: attr('string'),
  dateGmt: attr('string'),
  link: attr('string'),
  parent: belongsTo('comment', {async: true}),
  post: belongsTo('post', {async: true}),
  status: attr('string'),
  type: attr('string')
});
