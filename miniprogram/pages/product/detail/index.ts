import { requestAPI } from '../../../api/fetcher'
import { Color, Product, Selectors, Type } from '../../../types/types'
import {
    createSizeSelectors,
    parseSelectors,
    updateSizeSelectors
} from '../../../utils/util'

Component({
    data: {
        product: {} as Product,
        selectors: [] as Array<Selectors>,
        displayTypeData: {} as Type,
        sizeSelectors: [] as Array<Selectors>,
        displayColorData: {} as Color,
        actions: [
            {
                name: '客服',
                id: 'service',
                className: '',
                icon: 'icon-message'
            },
            { name: '购物袋', id: 'bag', className: '', icon: 'icon-cart' },
            {
                name: '添加到购物袋',
                id: 'addToCart',
                className: 'btn btn-secondary',
                icon: ''
            },
            { name: '立即购买', id: 'buyNow', className: 'btn btn-primary' }
        ]
    },
    methods: {
        async onLoad(opts: WechatMiniprogram.Page.CustomOption) {
            if (opts.id) {
                const prodRes = (await requestAPI(
                    `products/${opts.id}`
                )) as Product
                if (prodRes) {
                    this.setData({
                        product: prodRes
                    })
                    if (prodRes.types.length > 1) {
                        const selectors = parseSelectors(prodRes)
                        this.setData({
                            selectors
                        })
                    }
                    const defaultType = prodRes.types[0]
                    this.setData({
                        displayTypeData: defaultType
                    })
                    if (defaultType.colors.length > 0) {
                        const defaultColor = defaultType.colors[0]
                        const sizeSelectors = updateSizeSelectors(
                            defaultColor,
                            createSizeSelectors(defaultType)
                        )
                        this.setData({
                            sizeSelectors,
                            displayColorData: defaultColor
                        })
                    }
                }
            }
        },
        onSelectorChange(e: WechatMiniprogram.CustomEvent) {
            const { id } = e.detail
            const selectors = this.data.selectors
            console.log('id', id)
            const targetIndex = selectors.findIndex((e) => e.id === id)
            if (targetIndex >= 0) {
                const targetSelector = selectors[targetIndex]
                if (!targetSelector.selected) {
                    const UnselectedSelectors = selectors.map((selector) => {
                        return {
                            ...selector,
                            selected: false
                        }
                    })
                    targetSelector.selected = !targetSelector.selected
                    UnselectedSelectors[targetIndex] = targetSelector
                    const product = this.data.product as Product
                    const newType = product.types.find((type) => {
                        return type.id === id
                    })
                    this.setData({
                        selectors: UnselectedSelectors,
                        displayTypeData: newType
                    })
                    const newDefaultColor = newType?.colors[0]
                    if (newDefaultColor) {
                        const newSizeSelector = updateSizeSelectors(
                            newDefaultColor,
                            createSizeSelectors(newType)
                        )
                        this.setData({
                            sizeSelectors: newSizeSelector
                        })
                    }
                }
            }
        }
    }
})
