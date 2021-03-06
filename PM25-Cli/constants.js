/**
 * Copyright 2013 the PM2 project authors. All rights reserved.
 * Use of this source code is governed by a license that
 * can be found in the LICENSE file.
 */

var debug  = require('debug')('pm2:conf');
var p      = require('path');
var util   = require('util');
var chalk  = require('chalk');
var semver = require('semver');

/**
 * Get PM2 path structure
 */
var path_structure = require('./paths.js')(process.env.OVER_HOME);

/**
 * Constants variables used by PM2
 */
var csts = {
  PREFIX_MSG              : chalk.green('[PM2] '),
  PREFIX_MSG_ERR          : chalk.red('[PM2][ERROR] '),
  PREFIX_MSG_MOD          : chalk.bold.green('[PM2][Module] '),
  PREFIX_MSG_MOD_ERR      : chalk.red('[PM2][Module][ERROR] '),
  PREFIX_MSG_WARNING      : chalk.yellow('[PM2][WARN] '),
  PREFIX_MSG_SUCCESS      : chalk.cyan('[PM2] '),

  TEMPLATE_FOLDER         : p.join(__dirname, 'lib/templates'),

  APP_CONF_TPL            : 'ecosystem.tpl',
  SAMPLE_CONF_FILE        : 'sample-conf.js',
  LOGROTATE_SCRIPT        : 'logrotate.d/pm2',

  DOCKERFILE_NODEJS       : 'Dockerfiles/Dockerfile-nodejs.tpl',
  DOCKERFILE_JAVA         : 'Dockerfiles/Dockerfile-java.tpl',
  DOCKERFILE_RUBY         : 'Dockerfiles/Dockerfile-ruby.tpl',

  SUCCESS_EXIT            : 0,
  ERROR_EXIT              : 1,
  CODE_UNCAUGHTEXCEPTION  : 1,

  IS_WINDOWS              : (process.platform === 'win32' || process.platform === 'win64'),
  ONLINE_STATUS           : 'online',
  STOPPED_STATUS          : 'stopped',
  STOPPING_STATUS         : 'stopping',
  LAUNCHING_STATUS        : 'launching',
  ERRORED_STATUS          : 'errored',
  ONE_LAUNCH_STATUS       : 'one-launch-status',

  CLUSTER_MODE_ID         : 'cluster_mode',
  FORK_MODE_ID            : 'fork_mode',

  KEYMETRICS_ROOT_URL     : process.env.PM25_ROOT_URL || 'service.pm25.io',
  KEYMETRICS_BANNER       : '../lib/keymetrics',
  DEFAULT_MODULE_JSON     : 'package.json',

  REMOTE_PORT_TCP         : 8080,
  ROOT_PORT               : 8000,
  REMOTE_PORT             : 41624,
  REMOTE_REVERSE_PORT     : 43554,
  REMOTE_HOST             : process.env.PM25_REMOTE_HOST || 's1.pm25.io',
  SEND_INTERVAL           : 1000,
  GRACEFUL_TIMEOUT        : parseInt(process.env.PM2_GRACEFUL_TIMEOUT) || 8000,
  GRACEFUL_LISTEN_TIMEOUT : parseInt(process.env.PM2_GRACEFUL_LISTEN_TIMEOUT) || 3000,

  // Concurrent actions when doing start/restart/reload
  CONCURRENT_ACTIONS      : (function() {
    var concurrent_actions = parseInt(process.env.PM2_CONCURRENT_ACTIONS) || 1;
    if (semver.satisfies(process.versions.node, '>= 4.0.0'))
      concurrent_actions = 2;
    debug('Using %d parallelism (CONCURRENT_ACTIONS)', concurrent_actions);
    return concurrent_actions;
  })(),

  DEBUG                   : process.env.PM2_DEBUG || false,
  WEB_IPADDR              : process.env.PM2_API_IPADDR || '0.0.0.0',
  WEB_PORT                : parseInt(process.env.PM2_API_PORT)  || 9615,
  MODIFY_REQUIRE          : process.env.PM2_MODIFY_REQUIRE || false,

  WORKER_INTERVAL         : process.env.PM2_WORKER_INTERVAL || 30000,
  KILL_TIMEOUT            : process.env.PM2_KILL_TIMEOUT || 1600,
  PM2_PROGRAMMATIC        : typeof(process.env.pm_id) !== 'undefined' || process.env.PM2_PROGRAMMATIC,
  PM2_LOG_DATE_FORMAT     : process.env.PM2_LOG_DATE_FORMAT !== undefined ? process.env.PM2_LOG_DATE_FORMAT : 'YYYY-MM-DD HH:mm:ss'

};

module.exports = util._extend(csts, path_structure);
