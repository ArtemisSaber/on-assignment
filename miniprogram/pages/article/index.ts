import { requestAPI } from '../../api/fetcher'
import { ArticleData } from '../../types/types'

const app = getApp()

Component({
    data: {
        article: {},
        isLoading: true
    },
    methods: {
        async onLoad(_opts: WechatMiniprogram.Page.CustomOption) {
            if (!this.data.isLoading) {
                this.setData({ isLoading: true })
            }
            if (_opts.articleId) {
                const resData = (await requestAPI(
                    `articles/${_opts.articleId}`
                )) as ArticleData
                if (resData.content) {
                    const result = app.towxml(resData.content, 'markdown')
                    this.setData({
                        article: result,
                        isLoading: false
                    })
                }
            }
        }
    }
})
