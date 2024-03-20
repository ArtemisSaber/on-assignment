Component({
    properties: {
        selectors: {
            type: Array
        }
    },
    data: {
        formattedPrice: ''
    },
    methods: {
        onTapSelector(e: WechatMiniprogram.BaseEvent) {
            const { id } = e.currentTarget.dataset
            const detail = { id }
            this.triggerEvent('selectorchange', detail)
        }
    }
})
