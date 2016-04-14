import DS from 'ember-data';

const {Model, attr, hasMany} = DS;

export default Model.extend({
  name: attr('string'),
  slug: attr('string'),
  url: attr('string'),
  link: attr('string'),
  description: attr('string'),
  avatarUrls: attr(),
  acf: attr(),

  posts: hasMany('post', {async: true})
});
