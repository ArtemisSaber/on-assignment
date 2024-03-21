Component({
    properties: {
        colors: {
            type: Array
        },
        currentColor: {
            type: String
        }
    },
    data: {
        formattedPrice: ''
    },
    methods: {
        handleTapCarouselItem(e: WechatMiniprogram.BaseEvent) {
            this.triggerEvent('colortap', e.currentTarget.dataset)
        }
    }
})
