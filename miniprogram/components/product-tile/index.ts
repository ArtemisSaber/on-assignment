import { formatPrice } from '../../utils/util'

Component({
    properties: {
        item: {
            type: Object,
            observer(item) {
                // if we need to format the price
                if (item && item.displayPrice) {
                    this.setData({
                        formattedPrice: formatPrice({
                            amount: item.displayPrice
                        })
                    })
                }
            }
        }
    },
    data: {
        formattedPrice: ''
    },
    methods: {
        readyEditor(_e: WechatMiniprogram.EditorReady) {},
        changeStatusEditor(_e: WechatMiniprogram.EditorStatusChange) {},
        inputEditor(_e: WechatMiniprogram.EditorInput) {}
    }
})
