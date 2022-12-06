FROM gitpod/workspace-full

USER gitpod

RUN brew install fzf
RUN brew install kotlin