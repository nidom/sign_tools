module.exports = {
  apps: [{
    name: "sign_tools",
    script: "dist/main.js",
    instances: "2",
    exec_mode: "cluster",
    max_memory_restart: "6G", // 增加到 4GB
    log_rotate: true,        // 启用日志轮转
    max_size: "2M",         // 单个日志文件最大大小
    retain: "2",   
    env: {
        NODE_ENV: "development",
        PORT: 3000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000
   },
    port: 3000
  }]
} 

