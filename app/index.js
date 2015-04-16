'use strict'
var yeoman = require('yeoman-generator')
var chalk = require('chalk')
var yosay = require('yosay')

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json')
  },

  prompting: function () {
    var done = this.async()

    this.log(yosay(
      'Welcome to the ' + chalk.red('flux-riot') + ' apps generator!'
    ))

    var prompts = [{
      type    : 'input',
      name    : 'appname',
      message : 'Your project name',
      default : 'todo'
    }]

    this.prompt(prompts, function (props) {
      this.props = props
      done()
    }.bind(this))
  },

  configuring: function() {
    this.log('configuring')
    this.destinationRoot(this.props.appname)
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      )
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      )
      this.fs.copy(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('gulpfile.js')
      )
      this.fs.copy(
        this.templatePath('_README.md'),
        this.destinationPath('README.md')
      )
      this.fs.copy(
        this.templatePath('build'),
        this.destinationPath('build')
      )
      this.fs.copy(
        this.templatePath('src'),
        this.destinationPath('src')
      )
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      )
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      )
    }
  },

  install: function () {
    this.installDependencies()
  }
})
