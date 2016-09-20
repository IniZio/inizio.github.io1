var createFile = require('create-file');
var moment = require('moment')
var path = require('path')
var inquirer = require('inquirer')
var sanitize = require('sanitize-filename')

var now = moment().format('YYYY-MM-DD')

var post_name = ''
var current_subjects = ['math2111', 'comp2012', 'comp2611', 'comp2711', 'comp2611']

var questions = [{
  name: 'title',
  message: 'Post Title: ',
}, {
  name: 'category',
  message: 'Category: ',
  type: 'list',
  choices: ['Development', 'Life', 'Study', 'Game'],
}, {
  name: 'tags',
  message: 'Tags: ',
  type: 'checkbox',
  choices: ['webpack', 'vue'].concat(current_subjects),
}, ]

var answers = {}
inquirer.prompt(questions).then(function(answers) {
  // use alisa to ensure filename from title legit, works as index
  // NOTE however using alias instead of just filename may give error if not have this front matter...
  if (answers['category'] === 'Study') {
    answers['title'] = now + '__' + answers['tags'][0]
  }
  answers['alias'] = sanitize(answers['title'])
  answers['time'] = now

  // yaml front matter from
  var front_matter = '---\n'
  for (var key in answers) {
    if (key === 'tags') {
      front_matter += ' ' + key + ':\n  [ '
      answers[key].forEach(function(tag, index) {
        front_matter += tag + ','
      })
      front_matter = front_matter.slice(0, -1) + ' ]\n'
    } else front_matter += ' ' + key + ':' + answers[key] + '\n'
  }
  front_matter += ' ---\n'

  createFile('./src/pages/' + answers['alias'] + '.md', front_matter, function(err) {
    if (typeof(err) !== 'undefined' && err !== '') {
      console.error(err)
    } else {
      console.log('Post successfully created');
    }
  })

  // console.log('calling update json');
  // utils.updatePagesJson([answers])
})
