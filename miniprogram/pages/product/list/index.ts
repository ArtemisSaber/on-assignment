import { requestAPI } from '../../../api/fetcher'
import { ROUTES } from '../../../routes/routes'
import { navigateTo, urlcat } from '../../../utils/util'

Component({
    data: {
        products: [] as Array<any>
    },
    methods: {
        async onLoad() {
            const prodRes = (await requestAPI('products/')) as Array<any>
            console.log('products', prodRes)
            if (prodRes) {
                this.setData({
                    products: prodRes
                })
            }
        },
        onTapProduct(e: WechatMiniprogram.BaseEvent) {
            const { id } = e.currentTarget.dataset
            if (id) {
                navigateTo(urlcat(ROUTES.PDP, { id }))
            }
        }
    }
})
