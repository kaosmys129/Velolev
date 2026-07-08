# Maquin Static HTML Mirror

这是 `https://digital.creativemox.com/maquin/` 的本地静态镜像版本。

## 本地预览

当前已启动预览服务：

```bash
http://127.0.0.1:4173/
```

也可以在项目目录里重新启动：

```bash
python3 -m http.server 4173
```

## 已包含页面

- `/`
- `/about-us/`
- `/project/`
- `/equipment/`
- `/equipment-detail/`
- `/pricing-plan/`
- `/team/`
- `/faq/`
- `/contact-us/`
- `/blog/`
- `/404/`
- 6 篇公开博客文章

## 说明

- 页面、样式、脚本、字体和图片资源已本地化到当前目录。
- 表单、后台接口、评论提交、订阅提交等 WordPress 动态功能不会在纯静态环境中真正提交。
- 联系页地图仍是第三方嵌入内容，离线时可能不可用。
