import { Hono } from "hono";
import app from "./app.js";

// Vercel 零配置部署入口：默认导出 Hono 应用，Vercel 自动检测并提供服务
// （src/index.ts 导出 serveHotApi 供 Docker/PM2 启动；此处导出 app 供 Vercel）
export default app satisfies Hono;
