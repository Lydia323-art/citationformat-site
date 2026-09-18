# Stage DAG

## 标准依赖

```text
00 setup / domain / repo / permissions
  -> 01 research
    -> 02 PRD / route contract / user tasks
      -> 03 pricing
      -> 04 compliance
        -> 05 SEO-copy freeze
          -> 06 design source + content-fit matrix
            -> 08 backend / data contract
            -> 07 frontend implementation
              -> 10 SEO recheck
              -> 04 compliance recheck
              -> 02 PM acceptance
                -> 09 QA
                  -> 07/08 repair loop if needed
                    -> Owner Review
                      -> 11 launch ops
                        -> 14 observability
                          -> 12 data review
```

## 本项目并行规则

- 03 pricing 和 04 compliance 可在 PRD 冻结后并行。
- 07 frontend 和 08 backend 可并行，但必须已有 Route Contract、Copy Freeze、Design Source、Data Contract。
- 如果首版只做手动表单 + DOI lookup，后端可以降级为轻量 Worker API。
- QA 不能由实现者自证；P0/P1 必须返修后复验。

## 当前下一跳

下一阶段：02 PRD

PRD 必须回答：

- 首页主关键词是否定为 `apa citation generator pdf` / `apa citation generator free` 的组合切口。
- MVP 是否支持 DOI 自动查询。
- MVP 是否支持 PDF 上传；如支持，文件是否只本地解析、不上传服务器。
- 是否创建单独页面承接 ScienceDirect 场景，且避免侵权或误导性品牌使用。
