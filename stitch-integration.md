# Stitch Integration

项目：apa-citation-generator
阶段：06-design
状态：SETUP_READY

## 安全规则

- 不要把 Stitch API key 粘贴到聊天里。
- API key 只放在 Stitch MCP 配置、IDE secret/env，或本机受控配置中。
- 如果 key 泄露，立即到 Stitch settings 里 revoke / regenerate。

## 官方推荐接法

Google Codelab 的推荐链路是：

1. 在 Stitch 中生成 UI。
2. 在 IDE 中安装 Stitch MCP。
3. 粘贴 Stitch API key 到 MCP 配置。
4. 让 agent 列出 Stitch projects，确认连接成功。
5. 让 agent 读取设计 metadata / Design DNA，再实现前端。

参考：

- https://codelabs.developers.google.com/design-to-code-with-antigravity-stitch
- https://stitch.withgoogle.com

## 当前 Codex 环境状态

当前这个 Codex 会话没有暴露 Stitch MCP 工具，所以我还不能直接调用你的 Stitch 项目。

可行路线：

### 路线 A：先用 Stitch Web 生成设计

1. 打开 https://stitch.withgoogle.com
2. 新建 Web design。
3. 使用 `stitch-prompt.md` 里的 prompt。
4. 生成 desktop 首页和 mobile 首页。
5. 导出或保存：
   - desktop screenshot
   - mobile screenshot
   - exported HTML/CSS/React if available
6. 把导出文件或截图放回本项目目录。

### 路线 B：在支持 MCP 的 IDE 里接 Stitch

1. 打开支持 MCP 的 IDE，例如 Google Antigravity。
2. Agent Manager -> MCP Servers。
3. 搜索并安装 Stitch。
4. 粘贴 Stitch API key。
5. 验证：

```text
List my Stitch projects.
```

6. 让 agent 读取本项目生成的 Stitch 设计并导出 Design DNA。

### 路线 C：后续把 Stitch MCP 暴露给 Codex

如果你的 Codex 环境支持自定义 MCP server，可以把 Stitch MCP 配进去。配好后重启会话，工具列表里应该出现 Stitch 相关 MCP 工具。届时我可以直接读取 Stitch project 并更新 `design-source.md` / `frontend-handoff.md`。

## 验收产物

Stitch 接入后，至少补齐：

- `stitch-export-notes.md`
- `design-screenshot-desktop.png`
- `design-screenshot-mobile.png`
- exported source if available

补齐后可把 `stage-status.md` 中：

```text
06 design: DONE_LITE
```

更新为：

```text
06 design: DONE
```
