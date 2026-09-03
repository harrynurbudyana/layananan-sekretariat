module.exports = {
  apps: [
    {
      name: "fit-eoffice",
      script: "npm",
      args: "start",
      cwd: "./",
      instances: 1, // Menggunakan 1 instance (fork) agar SQLite aman dari write-lock collision
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
    },
  ],
};
