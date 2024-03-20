import { request } from '../../api/fetcher'

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
            const resData = await request(
                'https://www.vvadd.com/wxml_demo/demo.txt?v=2'
            )
            console.log('res data', resData)
            const result = app.towxml(resData, 'markdown')
            this.setData({ article: result })
        }
    }
})
