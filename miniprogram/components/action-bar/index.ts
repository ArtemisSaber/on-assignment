Component({
    properties: {
        actions: {
            type: Array
        }
    },
    data: {
        formattedPrice: ''
    },
    methods: {
        onTapAction(e: WechatMiniprogram.BaseEvent) {
            const { id } = e.currentTarget.dataset
            const detail = { id }
            this.triggerEvent('selectorchange', detail)
        }
    }
})
