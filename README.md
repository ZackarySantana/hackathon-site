# Skunkworks Internal Website

This is a "meta" Skunkworks project that is a [website](http://website.skunkworks.staging.corp.mongodb.com) for Skunkworks projects.

It has some features like:

- Viewing past/current projects
- Liking and commenting projects
- Automatic ranking of projects
- Advanced links (if available) for projects

## Setup

1. If you are running homebrew, Run `./scripts/setup.sh` It will verify that you have the required CLI tools installed:

   1. helm
   1. kubectl
   1. helm ksec (for secrets management)

   If you have previously followed the main [guide](../../getting_started/README.md) you should have these tools already installed.

2. Configure kubectl with [kubeconfig](../../configuration/kubeconfig.md). Note, you only need to setup your kubeconfig for `api.staging.corp.mongodb.com`.
   - You can use the command `make context` to switch to the skunkworks namespace.

## Development

This project can be ran using `npm run dev` or if you want to test what a deployment would run, `make run`.

## Deployment

This project uses Helm to deploy to the Skunkworks namespace. To deploy, you will need Docker as well installed on your system and then you run `make install`.
