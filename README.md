# Betterbnb

> Clone of airbnb home listing page

## Related Projects

  - https://github.com/Betterbnb/calendar
  - https://github.com/Betterbnb/reviews
  - https://github.com/Betterbnb/booking

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
4. [CRUD API](#crudAPI)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
-Run npm install in terminal
-Go into database/db-mysql.js and change log in info to your own
-Run npm start
```

### CRUD API

GET homes/:homeId/images

POST homes/:homeId/images 

data: {
  location,
  number
}

PATCH homes/:homeId/images

data: {
  oldLocation,
  oldNumber,
  newLocation,
  newNumber
}

DELETE homes/:homeId/images

data: {
  location,
  number
}