# UA Bouffe Front
[![Build status](https://github.com/ungdev/UA-bouffe-front/actions/workflows/ci.yml/badge.svg)](https://github.com/ungdev/UA-bouffe-front/actions/workflows/ci.yml)

Console de vente de l'UTT Arena

## Installation

### Prérequis

- NodeJS
- Pnpm

### Installation de l'application
Voir [UA-bouffe](https://github.com/ungdev/UA-bouffe)

Anciennes instructions :
```
git clone https://github.com/ungdev/UA-bouffe-front
cp .env.example .env
pnpm i
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
pnpm lint:fix
```

### Démarrer l'API en production

```
pnpm build
pnpm start
```

### Licence

Le code est sous licence MIT.
