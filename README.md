# UA Bouffe API
[![Build Status](https://travis-ci.org/ungdev/UA-bouffe.svg?branch=master)](https://travis-ci.org/ungdev/UA-bouffe)

Console de vente de l'UTT Arena

## Installation

### Prérequis

- NodeJS
- Yarn

### Installation de l'application
```
git clone https://github.com/ungdev/UA-bouffe
cp .env.example .env
yarn
```
## Développement

### Démarrer l'API en développement
```
yarn dev
```
### Avant de commit
Afin de garder une certaine cohérence dans le code, on utilise EsLint et Prettier. Il faut donc bien lint le code avant de commit
```
yarn lint-fix
```

### Démarrer l'API en production
```
yarn build
yarn start
```
### Licence
Le code est sous licence MIT.
