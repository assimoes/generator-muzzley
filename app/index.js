'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var MuzzleyGeneratorGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the fabulous Muzzley Generator!'));

    var prompts = [
	
	{
		name: 'muzzleyName',
		message:'What is your Muzzley app name?'
	}
	,{
      name: 'muzzleyKey',
      message: 'Please provide your Muzzley App token:',
      default: true
    }
	];

    this.prompt(prompts, function (props) {
      this.muzzleyName = props.muzzleyName;
	  this.muzzleyKey = props.muzzleyKey;

      done();
    }.bind(this));
  },
  scaffoldFolders : function(){
		this.mkdir('app');
		this.mkdir('app/scripts');
		this.mkdir('app/css');
		this.mkdir('build');
  },
  copyMainFiles: function(){
	
	this.copy('_gruntfile.js','GruntFile.js');
	this.copy('_package.json','package.json');
		
	var context = {
		muzzleyKey: this.muzzleyKey,
		site_name:  this.muzzleyName
	}
	this.copy('_muzzley.js','app/scripts/muzzley.js',context);
	this.copy('_index.html','app/index.html',context);
	
  },
  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = MuzzleyGeneratorGenerator;
