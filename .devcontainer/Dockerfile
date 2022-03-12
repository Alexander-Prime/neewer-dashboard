FROM denoland/deno:alpine-1.18.2

RUN apk add curl git shadow sudo zsh

RUN groupadd sudo && \
    echo "%sudo ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/deno

RUN usermod -s /bin/zsh -G sudo deno && \
    curl -fsSL https://raw.githubusercontent.com/zimfw/install/master/install.zsh | sudo -udeno zsh && \
    echo "zmodule eriner" >> /home/deno/.zimrc
