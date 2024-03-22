# ON AG. Case study assignment
This repo is miniprogram codebase for ON AG. case study assignment, includes rendering article based on markdown and a mimic of ON miniprogram product detail page.

# To run a mock backend service
Create a file named `db.json` , put it somewhere you saw fit. Run `npx json-server -h 0.0.0.0 -p 8080 db.json` in the folder containing the file. Change `BASE_URL` in `config.ts` to corresponding IP/Domain where json-server is running.

# Add data to mock service
Below is an example of `db.json` file, feel free to edit it according to your need.

```
{
    "products": [
        {
            "id": "SHOE1",
            "name": "Lightning闪电",
            "category": "新一代训练运动鞋",
            "description": "新一代跑练结合多功能跑鞋，延续轻量脚感且灵活反馈的同时，提高贴合度和透气性。Lightning，不止于跑，全面开练。",
            "displayPrice": 149000,
            "coverimage": "https://images.ctfassets.net/hnk2vsx53n6l/VZUDaZCrEQewo5hw3Luia/76151c5ebfcd96d25889d9048bab3d36/ualukc47jl8aqbybyqhe.png?fm=webp",
            "types": [
                {
                    "id": "SHOE1-MEN",
                    "name": "男款",
                    "colors": [
                        {
                            "id": "color1",
                            "name": "Sapphire Blue",
                            "images": [
                                "https://images.ctfassets.net/hnk2vsx53n6l/2N799PpY9haJQ1scALq2EF/2507917c7b3327aa2606c77e23dbfa00/okp8tbci7bhrpdaovvkx.png?fm=webp",
                                "https://images.ctfassets.net/hnk2vsx53n6l/7vEmLT2cmbkU3z2EqOx7Z2/3c4aa9d67916debdedce0e91b31cc7db/v5oflxaf0iw7vkjr9wm2.png?fm=webp"
                            ],
                            "skus": [
                                {
                                    "id": "SHOE1-MEN-SPB-40",
                                    "size": "40",
                                    "price": "149000"
                                },
                                {
                                    "id": "SHOE1-MEN-SPB-41",
                                    "size": "41",
                                    "price": "149000"
                                },
                                {
                                    "id": "SHOE1-MEN-SPB-42",
                                    "size": "42",
                                    "price": "149000"
                                }
                            ]
                        },
                        {
                            "id": "color2",
                            "name": "Azure",
                            "images": [
                                "https://images.ctfassets.net/hnk2vsx53n6l/3W72pKDFSvmREWpisfe9mA/cbe6dffe51c7d80c96c0a6e851521fb0/kzae88btxbzptchby6eo.png?fm=webp",
                                "https://images.ctfassets.net/hnk2vsx53n6l/56kmgLJP35Y5dbAAJQ1XPT/0429ff7cb92c4d684d11e510fe72d0d6/jg32mztbq85f8fc4lq8h.png?fm=webp"
                            ],
                            "skus": [
                                {
                                    "id": "SHOE1-MEN-AZ-40",
                                    "size": "40",
                                    "price": "169000"
                                },
                                {
                                    "id": "SHOE1-MEN-AZ-42",
                                    "size": "42",
                                    "price": "169000"
                                }
                            ]
                        }
                    ],
                    "allSizes": [
                        "40",
                        "40.5",
                        "41",
                        "41.5",
                        "42",
                        "42.5",
                        "43",
                        "44"
                    ]
                },
                {
                    "id": "SHOE1-WOMEN",
                    "name": "女款",
                    "colors": [
                        {
                            "id": "color1",
                            "name": "Grand Black",
                            "images": [
                                "https://oss.on-running.cn/contentful_dtc/d6f456414cf5c5f144e6525f1c953d345f3c2674.png?x-oss-process=image/resize,w_928,m_lfit/format,webp",
                                "https://oss.on-running.cn/contentful_dtc/6aa098e985916cd790609c8b82a59a9a01dc0654.png?x-oss-process=image/resize,w_928,m_lfit/format,webp"
                            ],
                            "skus": [
                                {
                                    "id": "SHOE1-WOMEN-SPB-36",
                                    "size": "36",
                                    "price": "149000"
                                },
                                {
                                    "id": "SHOE1-WOMEN-SPB-36.5",
                                    "size": "36.5",
                                    "price": "149000"
                                },
                                {
                                    "id": "SHOE1-WOMEN-SPB-38",
                                    "size": "38",
                                    "price": "149000"
                                }
                            ]
                        },
                        {
                            "id": "color2",
                            "name": "Azure",
                            "images": [
                                "https://images.ctfassets.net/hnk2vsx53n6l/3W72pKDFSvmREWpisfe9mA/cbe6dffe51c7d80c96c0a6e851521fb0/kzae88btxbzptchby6eo.png?fm=webp",
                                "https://images.ctfassets.net/hnk2vsx53n6l/56kmgLJP35Y5dbAAJQ1XPT/0429ff7cb92c4d684d11e510fe72d0d6/jg32mztbq85f8fc4lq8h.png?fm=webp"
                            ],
                            "skus": [
                                {
                                    "id": "SHOE1-WOMEN-AZ-36.5",
                                    "size": "36.5",
                                    "price": "169000"
                                },
                                {
                                    "id": "SHOE1-WOMEN-AZ-39",
                                    "size": "39",
                                    "price": "169000"
                                },
                                {
                                    "id": "SHOE1-WOMEN-AZ-40",
                                    "size": "40",
                                    "price": "169000"
                                }
                            ]
                        }
                    ],
                    "allSizes": [
                        "36",
                        "36.5",
                        "37",
                        "37.5",
                        "38",
                        "38.5",
                        "39",
                        "40"
                    ]
                }
            ],
            "detailimages": [
                "https://oss.on-running.cn/cms_stage/images/0f9201e5f7862e58c4821968dc666a40.jpg?x-oss-process=image/resize,w_1728,m_lfit/format,webp"
            ],
            "about": [
                { "title": "适用场景", "text": "是路跑的理想之选。" },
                {
                    "title": "产品信息",
                    "text": "男款重量：单只鞋约275克（以美码男士8.5为例）\n女款重量：单只鞋约230克（以美码女士8.5为例）\n中底差：6毫米"
                },
                {
                    "title": "保养说明",
                    "text": "每次穿后用软毛刷掸去表面浮尘，然后用柔软的湿布擦拭。建议您不要经常清洗鞋子，如若需要请用冷水，然后在阴凉通风处吹干，避免直接暴晒在阳光及其他热源下，以免引起老化，变形，褪色等。遵循此保养说明有助于鞋子有更出色的表现。"
                },
                {
                    "title": "物流及退货政策",
                    "text": "关于发货：\n\nOn 昂跑官方商城所销售的商品正常情况下将在3天内（节假日除外）完成发货，On昂跑将选择合格物流供应商为配送承运商, 目前发货范围仅限中国大陆地区。\n\n关于退货：\n\nOn昂跑官方商城提供7天无理由退货服务。在您收到商品当日起（以签收日期为准）的7天内，如商品及包装保持 On昂跑官方商城出售时的原状，我们在收到退还货品且经查验符合退货条件后将为您提供商品全额退款服务。若发生包括但不限于：退回产品和所购产品不一致、包装盒受损、商品脏污、配件丢失情况，我们将无法为您提供退换货服务，且需由您承担相关运费。\n\n*Cyclon 订阅并非通过网络购买商品或商品销售行为，不适用于7天无理由退货服务。如您对此存在疑问或异议，欢迎咨询在线客服人员。\n\n基本的退货要求：\n\n请将商品放入原始包装盒内封妥，并确保商品，原包装、配件（包括但不仅限于吊牌、合格证）、赠品（如有）、发票（如有）齐全\n\n商品无明显穿着痕迹（包括折痕、磨损、脏污等），不影响二次销售。"
                }
            ]
        }
    ],
    "articles": [
        {
            "id": "ART-1",
            "content": "# My Awesome Article\n\n## Introduction\n\nWelcome to my awesome article! In this article, we'll explore some interesting topics related to Python, Markdown, and more.\n\n## Python Basics\n\nPython is a powerful and versatile programming language. Here are some basic Python concepts:\n\n- **Variables**: You can declare variables to store data.\n- **Lists**: Lists allow you to store multiple items.\n- **Functions**: Functions are reusable blocks of code.\n- **Loops**: Loops help you repeat tasks.\n\n## Markdown Syntax\n\nMarkdown is a lightweight markup language. Here are some common Markdown syntax examples:\n\n- **Headers**: Use `#` for headers (e.g., `# My Header`).\n- **Lists**: Create ordered or unordered lists.\n- **Links**: Add links using `text`.\n- **Images**: Embed images with `!alt text`.\n\n## Sample Table\n\n| Topic         | Description                                       |\n|---------------|---------------------------------------------------|\n| Python Basics | Variables, lists, functions, and loops            |\n| Markdown      | Headers, lists, links, and images                 |\n| Fun           | Happy coding! 🚀                                 |\n\n## Conclusion\n\nThanks for reading my awesome article! Feel free to explore more about Python and Markdown.\n\nHappy coding! 🚀"
        }
    ]
}
```
