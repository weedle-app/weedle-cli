# Weelde CLI (Beta)

<!-- toc -->
* [Weelde CLI (Beta)](#weelde-cli-beta)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->
```sh-session
$ npm install -g weedle-cli
$ weedle COMMAND
running command...
$ weedle (--version)
weedle-cli/0.1.0 darwin-x64 node-v16.9.1
$ weedle --help [COMMAND]
USAGE
  $ weedle COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`weedle help [COMMAND]`](#weedle-help-command)
* [`weedle plugins`](#weedle-plugins)
* [`weedle plugins:install PLUGIN...`](#weedle-pluginsinstall-plugin)
* [`weedle plugins:inspect PLUGIN...`](#weedle-pluginsinspect-plugin)
* [`weedle plugins:install PLUGIN...`](#weedle-pluginsinstall-plugin-1)
* [`weedle plugins:link PLUGIN`](#weedle-pluginslink-plugin)
* [`weedle plugins:uninstall PLUGIN...`](#weedle-pluginsuninstall-plugin)
* [`weedle plugins:uninstall PLUGIN...`](#weedle-pluginsuninstall-plugin-1)
* [`weedle plugins:uninstall PLUGIN...`](#weedle-pluginsuninstall-plugin-2)
* [`weedle plugins:update`](#weedle-pluginsupdate)

## `weedle help [COMMAND]`

Display help for weedle.

```
USAGE
  $ weedle help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for weedle.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `weedle plugins`

List installed plugins.

```
USAGE
  $ weedle plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ weedle plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `weedle plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ weedle plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ weedle plugins:add

EXAMPLES
  $ weedle plugins:install myplugin 

  $ weedle plugins:install https://github.com/someuser/someplugin

  $ weedle plugins:install someuser/someplugin
```

## `weedle plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ weedle plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ weedle plugins:inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/inspect.ts)_

## `weedle plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ weedle plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ weedle plugins:add

EXAMPLES
  $ weedle plugins:install myplugin 

  $ weedle plugins:install https://github.com/someuser/someplugin

  $ weedle plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/install.ts)_

## `weedle plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ weedle plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ weedle plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/link.ts)_

## `weedle plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ weedle plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ weedle plugins:unlink
  $ weedle plugins:remove
```

## `weedle plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ weedle plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ weedle plugins:unlink
  $ weedle plugins:remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/uninstall.ts)_

## `weedle plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ weedle plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ weedle plugins:unlink
  $ weedle plugins:remove
```

## `weedle plugins:update`

Update installed plugins.

```
USAGE
  $ weedle plugins:update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/update.ts)_
<!-- commandsstop -->
