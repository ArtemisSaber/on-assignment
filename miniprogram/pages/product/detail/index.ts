import { requestAPI } from '../../../api/fetcher'
import { Color, Product, Selectors, Skus, Type } from '../../../types/types'
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
        currentSKU: {} as Skus,
        innerScrollable: false,
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
        ],
        currentDisplayPrice: ''
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
                        if (defaultColor.skus.length > 0) {
                            const defaultSKU = defaultColor.skus[0]
                            this.setData({
                                currentSKU: defaultSKU
                            })
                        }
                    }
                }
            }
        },
        onOuterViewLower(e: WechatMiniprogram.ScrollViewScrollToLower) {
            console.log('scroll to lower', e.detail)
            this.setData({ innerScrollable: true })
        },
        onInnerViewTop(e: WechatMiniprogram.ScrollViewScrollToUpper) {
            console.log('inner scroll to upper', e.detail)

            this.setData({ innerScrollable: false })
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
                            sizeSelectors: newSizeSelector,
                            displayColorData: newDefaultColor
                        })
                        if (newDefaultColor.skus.length > 0) {
                            const newDefaultSKU = newDefaultColor.skus[0]
                            this.setData({
                                currentSKU: newDefaultSKU
                            })
                        }
                    }
                }
            }
        },
        onColorChange(e: WechatMiniprogram.CustomEvent) {
            const { colorid } = e.detail
            const currentColor = this.data.displayColorData
            if (currentColor.id === colorid) {
                return
            } else {
                const newColor = this.data.displayTypeData.colors.find(
                    (color) => color.id === colorid
                )
                if (newColor) {
                    const newSizeSelector = updateSizeSelectors(
                        newColor,
                        this.data.sizeSelectors
                    )
                    this.setData({
                        displayColorData: newColor,
                        sizeSelectors: newSizeSelector
                    })
                    if (newColor.skus.length > 0) {
                        const selectedSize = newSizeSelector.find(
                            (size) => size.selected
                        )
                        if (selectedSize) {
                            const newSKU = newColor.skus.find(
                                (sku) => sku.size === selectedSize.id
                            )
                            if (newSKU) {
                                this.setData({
                                    currentSKU: newSKU
                                })
                            } else {
                                this.setData({
                                    currentSKU: newColor.skus[0]
                                })
                            }
                        } else {
                            this.setData({
                                currentSKU: newColor.skus[0]
                            })
                        }
                    }
                } else {
                    return
                }
            }
        },
        onSizeSelectorChange(e: WechatMiniprogram.CustomEvent) {
            console.log('detail', e.detail)
            const { id } = e.detail
            const sizeSelector = this.data.sizeSelectors
            const newSizeSelector = sizeSelector.map((size) => {
                return {
                    ...size,
                    selected: size.id === id
                }
            })
            this.setData({
                sizeSelectors: newSizeSelector
            })
            const currentColor = this.data.displayColorData
            if (currentColor && currentColor.skus.length > 0) {
                const newSKU = currentColor.skus.find((sku) => sku.size === id)
                if (newSKU) {
                    this.setData({
                        currentSKU: newSKU
                    })
                }
            }
        }
    }
})
