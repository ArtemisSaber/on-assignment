Component({
    properties: {
        images: {
            type: Array
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
