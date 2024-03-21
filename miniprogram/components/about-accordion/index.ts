Component({
    properties: {
        item: {
            type: Object
        }
    },
    data: {
        showAccordion: false
    },
    methods: {
        handleTapTitle() {
            const showAccordion = this.data.showAccordion
            this.setData({
                showAccordion: !showAccordion
            })
        }
    }
})
