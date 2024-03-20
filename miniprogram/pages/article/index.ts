import { request } from '../../api/fetcher'
import { ArticleData } from '../../types/types'

const app = getApp()

Component({
    data: {
        article: {},
        isLoading: true
    },
    methods: {
        async onLoad(opts: any) {
            if (!this.data.isLoading) {
                this.setData({ isLoading: true })
            }
            const resData = (await request(
                'http://192.168.6.10:8080/articles/ART-1'
            )) as ArticleData
            console.log('res data', resData)
            if (resData.content) {
                const result = app.towxml(resData.content, 'markdown')
                this.setData({ article: result, isLoading: false })
            }
        }
    }
})
