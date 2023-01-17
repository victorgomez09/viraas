## Viraas
### A self-hosted, docker based, PaaS with cluster and ARM support.

----

<p align="center">
  <a href="https://github.com/victorgomez09/viraas/actions/workflows/validate.yml">
    <img src="https://github.com/victorgomez09/viraas/actions/workflows/validate.yml/badge.svg" alt="Validate" />
  </a>
  <a href="https://hub.docker.com/r/vira/viraas">
    <img src="https://img.shields.io/badge/Docker Hub-vira%2Fviraas-success?logo=docker&logoColor=aaa" alt="Docker Hub" />
  </a>
  <a href="https://github.com/victorgomez09/viraas/releases">
    <img src="https://img.shields.io/badge/CLI-Latest-success?logo=github&logoColor=aaa" alt="Install the CLI" />
  </a>
  <a href="https://victorgomez09.github.io/viraas">
    <img src="https://img.shields.io/badge/Documentation-blue" alt="Documentation" />
  </a>
</p>

Viraas is a self-hosted, docker based, Heroku-like PaaS with cluster and ARM support.

###### 😖 What does that even mean?

- ***Self-hosted***: You deploy the [`vira/viraas` docker image](https://hub.docker.com/r/vira/viraas) on your own infrastructure, and own everything (work in progress)
- ***Docker based***: Apps are based off of [Docker images](https://docs.docker.com/develop/)
- ***Heroku-like [PaaS](https://en.wikipedia.org/wiki/Platform_as_a_service)***: Deploy and manage apps from a [UI (work in progress)](./.github/assets/ui.png) or CLI, similar to Heroku
- [***Cluster***](https://en.wikipedia.org/wiki/Computer_cluster): Scale the platform horizontally by using multiple computers/devices to run your apps
- ***ARM support***: In addition to the standard CPU architectures, Viraas is [published with ARM support](https://hub.docker.com/r/vira/viraas/tags)

> Checkout the [full feature list](https://victorgomez09.github.io/viraas/#features)!

#### 🚪 Why is it the "cloud for your closet"?

I originally wrote Viraas as a simple way to deploy apps to some Raspberry Pis in my closet on my local network!

Since then, features have been added to make it an *almost* production ready service.

#### ✨ What makes Viraas unique?

- The only self hosted PaaS that supports both **clusters** and **ARM devices**
- Most apps can be deployed with zero config

### 📘 Docs

Head over to the docs to learn more or get started: <https://victorgomez09.github.io/viraas>

### 👋 Contributing

<a href="https://github.com/victorgomez09/viraas/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=vira/viraas" />
</a>

Check out the [contributing docs](https://victorgomez09.github.io/viraas/docs/contributing) to get your local development environment setup.
