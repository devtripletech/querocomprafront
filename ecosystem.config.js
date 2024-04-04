module.exports = {
  apps: [
    {
      name: "HTTP-WEB(quero)",
      script: "npm",
      args: "start",
      cwd: "/home/roottnote/querocomprafront",
      instances: 1,
      autorestart: true,
      watch: true,
      max_memory_restart: "1G",
    },
  ],
}

