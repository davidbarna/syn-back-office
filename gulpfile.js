/*
 * Gulpfile
 * Tasks are registered from dev-tools module.
 */
devTools = require( 'syn-dev-tools/gulp' )
manager = devTools.Manager.getInstance( require( 'gulp' ) )
manager.registerTasks();
