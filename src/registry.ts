import { config } from "./config.js";
import { Hono } from "hono";
import getRSS from "./utils/getRSS.js";
// 静态导入所有路由（兼容 Vercel serverless 打包，Docker/PM2 同样适用）
import { handleRoute as handle_36kr } from "./routes/36kr.js";
import { handleRoute as handle_51cto } from "./routes/51cto.js";
import { handleRoute as handle_52pojie } from "./routes/52pojie.js";
import { handleRoute as handle_acfun } from "./routes/acfun.js";
import { handleRoute as handle_baidu } from "./routes/baidu.js";
import { handleRoute as handle_bilibili } from "./routes/bilibili.js";
import { handleRoute as handle_coolapk } from "./routes/coolapk.js";
import { handleRoute as handle_csdn } from "./routes/csdn.js";
import { handleRoute as handle_dgtle } from "./routes/dgtle.js";
import { handleRoute as handle_douban_group } from "./routes/douban-group.js";
import { handleRoute as handle_douban_movie } from "./routes/douban-movie.js";
import { handleRoute as handle_douyin } from "./routes/douyin.js";
import { handleRoute as handle_earthquake } from "./routes/earthquake.js";
import { handleRoute as handle_gameres } from "./routes/gameres.js";
import { handleRoute as handle_geekpark } from "./routes/geekpark.js";
import { handleRoute as handle_genshin } from "./routes/genshin.js";
import { handleRoute as handle_github } from "./routes/github.js";
import { handleRoute as handle_guokr } from "./routes/guokr.js";
import { handleRoute as handle_hackernews } from "./routes/hackernews.js";
import { handleRoute as handle_hellogithub } from "./routes/hellogithub.js";
import { handleRoute as handle_history } from "./routes/history.js";
import { handleRoute as handle_honkai } from "./routes/honkai.js";
import { handleRoute as handle_hostloc } from "./routes/hostloc.js";
import { handleRoute as handle_hupu } from "./routes/hupu.js";
import { handleRoute as handle_huxiu } from "./routes/huxiu.js";
import { handleRoute as handle_ifanr } from "./routes/ifanr.js";
import { handleRoute as handle_ithome } from "./routes/ithome.js";
import { handleRoute as handle_ithome_xijiayi } from "./routes/ithome-xijiayi.js";
import { handleRoute as handle_jianshu } from "./routes/jianshu.js";
import { handleRoute as handle_juejin } from "./routes/juejin.js";
import { handleRoute as handle_kuaishou } from "./routes/kuaishou.js";
import { handleRoute as handle_linuxdo } from "./routes/linuxdo.js";
import { handleRoute as handle_lol } from "./routes/lol.js";
import { handleRoute as handle_miyoushe } from "./routes/miyoushe.js";
import { handleRoute as handle_netease_news } from "./routes/netease-news.js";
import { handleRoute as handle_newsmth } from "./routes/newsmth.js";
import { handleRoute as handle_ngabbs } from "./routes/ngabbs.js";
import { handleRoute as handle_nodeseek } from "./routes/nodeseek.js";
import { handleRoute as handle_nytimes } from "./routes/nytimes.js";
import { handleRoute as handle_producthunt } from "./routes/producthunt.js";
import { handleRoute as handle_qq_news } from "./routes/qq-news.js";
import { handleRoute as handle_sina } from "./routes/sina.js";
import { handleRoute as handle_sina_news } from "./routes/sina-news.js";
import { handleRoute as handle_smzdm } from "./routes/smzdm.js";
import { handleRoute as handle_sspai } from "./routes/sspai.js";
import { handleRoute as handle_starrail } from "./routes/starrail.js";
import { handleRoute as handle_thepaper } from "./routes/thepaper.js";
import { handleRoute as handle_tieba } from "./routes/tieba.js";
import { handleRoute as handle_toutiao } from "./routes/toutiao.js";
import { handleRoute as handle_v2ex } from "./routes/v2ex.js";
import { handleRoute as handle_weatheralarm } from "./routes/weatheralarm.js";
import { handleRoute as handle_weibo } from "./routes/weibo.js";
import { handleRoute as handle_weread } from "./routes/weread.js";
import { handleRoute as handle_yystv } from "./routes/yystv.js";
import { handleRoute as handle_zhihu } from "./routes/zhihu.js";
import { handleRoute as handle_zhihu_daily } from "./routes/zhihu-daily.js";

// 路由处理器映射表
const routeHandlers: Record<string, (c: any, noCache: boolean) => Promise<any>> = {
  "36kr": handle_36kr,
  "51cto": handle_51cto,
  "52pojie": handle_52pojie,
  "acfun": handle_acfun,
  "baidu": handle_baidu,
  "bilibili": handle_bilibili,
  "coolapk": handle_coolapk,
  "csdn": handle_csdn,
  "dgtle": handle_dgtle,
  "douban-group": handle_douban_group,
  "douban-movie": handle_douban_movie,
  "douyin": handle_douyin,
  "earthquake": handle_earthquake,
  "gameres": handle_gameres,
  "geekpark": handle_geekpark,
  "genshin": handle_genshin,
  "github": handle_github,
  "guokr": handle_guokr,
  "hackernews": handle_hackernews,
  "hellogithub": handle_hellogithub,
  "history": handle_history,
  "honkai": handle_honkai,
  "hostloc": handle_hostloc,
  "hupu": handle_hupu,
  "huxiu": handle_huxiu,
  "ifanr": handle_ifanr,
  "ithome": handle_ithome,
  "ithome-xijiayi": handle_ithome_xijiayi,
  "jianshu": handle_jianshu,
  "juejin": handle_juejin,
  "kuaishou": handle_kuaishou,
  "linuxdo": handle_linuxdo,
  "lol": handle_lol,
  "miyoushe": handle_miyoushe,
  "netease-news": handle_netease_news,
  "newsmth": handle_newsmth,
  "ngabbs": handle_ngabbs,
  "nodeseek": handle_nodeseek,
  "nytimes": handle_nytimes,
  "producthunt": handle_producthunt,
  "qq-news": handle_qq_news,
  "sina": handle_sina,
  "sina-news": handle_sina_news,
  "smzdm": handle_smzdm,
  "sspai": handle_sspai,
  "starrail": handle_starrail,
  "thepaper": handle_thepaper,
  "tieba": handle_tieba,
  "toutiao": handle_toutiao,
  "v2ex": handle_v2ex,
  "weatheralarm": handle_weatheralarm,
  "weibo": handle_weibo,
  "weread": handle_weread,
  "yystv": handle_yystv,
  "zhihu": handle_zhihu,
  "zhihu-daily": handle_zhihu_daily,
};

const app = new Hono();

// 全部路由
const allRoutePath = Object.keys(routeHandlers);
// 排除路由
const excludeRoutes: Array<string> = [];

// 注册全部路由
for (let index = 0; index < allRoutePath.length; index++) {
  const router = allRoutePath[index];
  // 是否处于排除名单
  if (excludeRoutes.includes(router)) {
    continue;
  }
  const listApp = app.basePath(`/${router}`);
  // 返回榜单
  listApp.get("/", async (c) => {
    // 是否采用缓存
    const noCache = c.req.query("cache") === "false";
    // 限制显示条目
    const limit = c.req.query("limit");
    // 是否输出 RSS
    const rssEnabled = c.req.query("rss") === "true";
    // 获取路由处理器
    const handleRoute = routeHandlers[router];
    const listData = await handleRoute(c, noCache);
    // 是否限制条目
    if (limit && listData?.data?.length > parseInt(limit)) {
      listData.total = parseInt(limit);
      listData.data = listData.data.slice(0, parseInt(limit));
    }
    // 是否输出 RSS
    if (rssEnabled || config.RSS_MODE) {
      const rss = getRSS(listData);
      if (typeof rss === "string") {
        c.header("Content-Type", "application/xml; charset=utf-8");
        return c.body(rss);
      } else {
        return c.json({ code: 500, message: "RSS generation failed" }, 500);
      }
    }
    return c.json({ code: 200, ...listData });
  });
  // 请求方式错误
  listApp.all("*", (c) => c.json({ code: 405, message: "Method Not Allowed" }, 405));
}

// 获取全部路由
app.get("/all", (c) =>
  c.json(
    {
      code: 200,
      count: allRoutePath.length,
      routes: allRoutePath.map((path) => {
        // 是否处于排除名单
        if (excludeRoutes.includes(path)) {
          return {
            name: path,
            path: undefined,
            message: "This interface is temporarily offline",
          };
        }
        return { name: path, path: `/${path}` };
      }),
    },
    200,
  ),
);

export default app;
