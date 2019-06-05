# hexo-asset-image


Give asset image in hexo a absolutely path automatically

# Usege

```shell
package.json dependencies 直接添加例如

{
  "name": "hexo-site",
  "version": "0.0.0",
  "private": true,
  "hexo": {
    "version": "3.8.0"
  },
  "dependencies": {
    "hexo": "^3.7.1",
    "hexo-asset-image": "https://github.com/JackCh3n/hexo-asset-image.git",
  }
}
```

# Example

```shell
MacGesture2-Publish
├── apppicker.jpg
├── logo.jpg
└── rules.jpg
MacGesture2-Publish.md
建立和文章一样的名字
```

Make sure `post_asset_folder: true` in your `_config.yml`.

Just use `![logo](logo.jpg)` to insert `logo.jpg`.

# History

2018-04-18: support hexo-abbrlink

2019-06-05:删除多级目录,根据出现的问题进行小幅度的修改