# Weelde CLI (Beta)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g weedle
$ weedle COMMAND
running command...
$ weedle (--version)
weedle/0.1.3 darwin-x64 node-v16.9.1
$ weedle --help [COMMAND]
USAGE
  $ weedle COMMAND --flags
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`weedle dev PLATFORM`](#weedle-dev-platform)

## `weedle dev PLATFORM`

Run a node for development environment also provides the ability to forward a port for mobile using adb

```
USAGE
  $ weedle dev PLATFORM -f <value>

ARGUMENTS
  PLATFORM  Currently only supports mobile, so the value here should be mobile

FLAGS
  -f, --forward-port  (optional) Will forward port the node is running on so your mobile device can connect
  -o, --node-options (optional) Options for ganache cli. This supports all flags that can be found here https://www.npmjs.com/package/ganache
  -p, --port (optional) Port you will like to run the node on

DESCRIPTION
  Helps setup a development environment for different platforms

EXAMPLES
  $ weedle dev mobile

```

<!-- commandsstop -->
