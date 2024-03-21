import { formatPrice } from '../../utils/util'

Component({
    properties: {
        sku: {
            type: Object,
            observer(sku) {
                // if we need to format the price
                if (sku && sku.price) {
                    this.setData({
                        formattedPrice: formatPrice({
                            amount: sku.price
                        })
                    })
                }
            }
        }
    },
    data: {
        formattedPrice: ''
    },
    methods: {}
})
