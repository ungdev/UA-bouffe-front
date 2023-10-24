# UA Bouffe API

[![Build Status](https://travis-ci.org/ungdev/UA-bouffe.svg?branch=master)](https://travis-ci.org/ungdev/UA-bouffe)

Console de vente de l'UTT Arena

## Installation

### Prérequis

- NodeJS
- Pnpm

### Installation de l'application

```
git clone https://github.com/ungdev/UA-bouffe
cp .env.example .env
pnpm
```

## Développement

### Démarrer l'API en développement

```
pnpm dev
```

### Avant de commit

Afin de garder une certaine cohérence dans le code, on utilise EsLint et Prettier. Il faut donc bien lint le code avant
de commit

```
pnpm lint-fix
```

### Démarrer l'API en production

```
pnpm build
pnpm start
```

### Licence

Le code est sous licence MIT.
