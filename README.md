# CARE International

![CARE International Screenshot](screenshot.png)

## Installation

Requirements:

* [NodeJs](https://nodejs.org/es/download/)

To install run command:

```bash
yarn install
```

## Usage

In development mode,

create a `.env` file with:

```
BASE_LAYER_ID=aa0b663e-b8af-4433-9ab0-4dbeb7c1b981
LABEL_LAYER_ID=3cb14d6b-49ab-423b-8290-7a19d374381e
CARTODB_ACCOUNT=careinternational
```

And run local server running:

```bash
yarn start

```

Build
```bash
BASE_LAYER_ID=aa0b663e-b8af-4433-9ab0-4dbeb7c1b981 LABEL_LAYER_ID=3cb14d6b-49ab-423b-8290-7a19d374381e CARTODB_ACCOUNT=careinternational yarn build
```

## Deploy to production
Note this project is hosted in the client's server and we only have FTP access to it. Ask PM for credentials to access it. 

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request :D

## LICENSE

[MIT](LICENSE)
