# DPro's NPM License Checker

This tool produces a nice report of your projects direct and recursive dependencies. It is not intended to be a customizable tool, but a straight-forward, simple tool that accomplishes the task of producing a quick report.

If you are looking for a more customizable tool with different options, check out [the module this tool is based on](https://www.npmjs.com/package/license-checker-rseidelsohn).

## Installation

```bash
npm install -g dpro-npm-license-checker
```

## Usage

From within your project directory (the project you want to release as OSS), run:

```bash
dpro-npm-license-checker
```

It will create a file named `dependencies.csv` that you can import into a Google sheet or use however you need.
