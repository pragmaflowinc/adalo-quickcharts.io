# Quickcharts.io for Adalo

##Status - 2022-05-13
- Working

##Known Bugs
- Chart Colors all become grey on iOS


This component has not been published to the marketplace at the time of this writting so the only way to use it is private.

## Installation

We have released a new website to facilitate installing componets located here: https://adalo.pragmaflowservers.com/install-component

## Motivation

The motivation behind this component is to create charts that can count the number of records that match a filter (list) set and group them by a second property (example: number of orders placed by a user each day/week/month) 

## Running private

Prerequisites

- NodeJS
- Yarn
- Linux/macOS/WSL

Clone the respository and run
``` bash
$ yarn                # install dependencies
$ yarn build          # build typescript project
$ npx adalo login     # login to your adalo account
$ npx adalo publish   # deploy the component privately to your account
```

## How to use the component

Once the component is installed, you can drag and drop the location component onto the app screen and configure it.
