# volvet 采购页与私有询盘服务运维

日期：2026-10-28。适用D15–D30本地验收版本。询盘保存在私有收件箱；外部邮箱通知尚未配置。

## 本地启动

运行环境为Node.js 22.12及以上版本。本次使用22.12.0验证；`node:sqlite`通过 `--experimental-sqlite`启用，相关特性状态见[该版本官方文档](https://nodejs.org/download/release/v22.12.0/docs/api/sqlite.html)。

```sh
cd /Users/peterpc/Documents/liftpolemachine-web/maquin-astro-theme
npm run build
npm run serve
```

默认仅绑定 `127.0.0.1:8787`，同时提供 `dist/` 页面与 `/api/inquiries`。请求实际保存成功后才返回201和VOL回执；相同请求重试返回200和原回执，不重复落库。字段校验、限流、文件超限、存储异常均返回错误；前端保留本页内容以便重试。

单独运行 `astro dev`、`astro preview`或静态托管只提供页面，不提供本服务的询盘API。需要采购全链路预览时使用 `npm run serve`。英语核心页使用独立组件；旧“文字图片替换后台”针对历史片段，不能代替核心组件/产品模型编辑。

## 私有收件箱

打开 `http://127.0.0.1:8787/admin/inquiries/`。默认首次启动会生成管理密钥文件 `.local/inquiries/admin-token`；在本机私下读取该文件后填入界面。不要把密钥贴进聊天、URL、截图、共享报告或版本控制。服务日志只显示文件位置，不打印密钥。

密钥只保留在页面内存，刷新或退出后需重新输入。列表默认排除测试记录；“包含测试记录”用于受控验收。详情可查看原始项目资料、下载附件及修改状态；状态依次可用“新询盘、审核中、已报价、已关闭”。“已报价”是人工处理标记，页面不会自动发报价或邮件。CSV导出同样需要鉴权，包含个人联系方式，应按业务资料保管。

默认私有目录为 `.local/inquiries/`：

| 文件 | 内容 | 管理要求 |
|---|---|---|
| inquiries.sqlite | 询盘、状态、附件BLOB与去重键 | 目录700，数据库600；不放在public/dist |
| inquiries.sqlite-wal / -shm | SQLite运行期间的日志及共享状态 | 随数据库一起维护，不能单独删除来“清缓存” |
| admin-token | 本地生成的管理密钥 | 文件600；正式环境改用受控密钥配置 |

私有目录与SQLite文件已被Git忽略。管理员路由、API和附件要求Bearer鉴权；附件强制下载，不提供公共文件地址。上传目前检查扩展名、MIME、文件签名和大小（PDF/JPG/PNG，5 MiB）；这不等于病毒扫描。实施依据参考[OWASP文件上传指南](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)与[REST安全指南](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)，本轮不声称已完成独立安全审计。

## 配置项

以下读取进程环境变量；普通 `npm run serve`不自动加载 `.env`。设置后重启服务。`PUBLIC_SITE_URL`还影响静态构建，变更时应重新构建。

| 变量 | 默认值/约束 |
|---|---|
| PUBLIC_SITE_URL | 留空表示正式域名待配；正式值必须是HTTPS origin，无路径/查询/账号信息 |
| INQUIRY_HOST | 127.0.0.1；外部绑定需正式origin、显式管理密钥及非测试模式 |
| INQUIRY_PORT | 8787 |
| INQUIRY_DATA_DIR | 项目内.local/inquiries；可改为Web根目录以外的私有持久化目录 |
| INQUIRY_ADMIN_TOKEN | 至少32字符的随机密钥；本地未设时生成私有文件，正式环境必须显式提供 |
| INQUIRY_TEST_MODE | 默认关闭；仅严格等于true时所有新增记录标记为测试 |

当前正式域名、邮箱、电话为空，禁止用历史品牌联系信息填充。邮箱通知没有配置开关或投递实现；本服务不能被描述成已连接SMTP或CRM。配置直联方式需更新 `src/data/content-baseline.json`并重新审核可见页面和政策。

## 备份与恢复

本地最直接的备份方法是先正常停止服务，确认进程退出，再把整个私有目录复制到非公开、访问受限的位置，完成后重新启动。不要只复制运行中的主SQLite文件而遗漏WAL。生产在线备份需采用SQLite一致性备份机制，并验证备份可读。

恢复时先停止服务，把经验证的备份还原到私有目录，保持目录/文件权限；确认正式环境管理密钥来源后重启。用授权收件箱核对记录、附件和状态。恢复与清理不得在公开Web目录内进行，备份也包含个人资料与附件；保留期、删除流程和业务责任人须在正式发布前确定。

## 验证与生产准备

```sh
npm test
npm run d30:browser
npm run content:inventory
npm run release:check
```

接口测试覆盖真实存储、去重、失败、鉴权与重启。浏览器测试仅访问本机，独立使用 `.local/d30-controlled-inbox/`，每条记录标记为测试，不计销售线索，不向外部发邮件。测试报告位于 `docs/content-strategy/`。

正式上线还需业务确认域名、联系方式、主体与保留期；部署持久化磁盘、HTTPS和明确的管理密钥；按最终环境重做收件、附件、重启恢复与301验证。构建和服务应使用同一正式origin。反向代理应保留正式Host；服务不信任任意X-Forwarded-For，目前按直接连接IP限流（15次/10分钟），代理上线需审核该策略，避免所有访客共用一个限额。

这是有状态Node服务，不能只把dist上传到静态平台后宣称询盘已可用。生产环境收到一次经授权的受控询盘并在收件箱核对前，不解除正式收件验收要求。本轮未执行这些生产动作。
