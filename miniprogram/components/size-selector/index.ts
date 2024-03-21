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
            const { id, enabled } = e.currentTarget.dataset
            const detail = { id }
            if (enabled) {
                this.triggerEvent('selectorchange', detail)
            }
        }
    }
})
