import { Color, Product, Selectors, Type } from '../types/types'

export const querystring = {
    stringify(o: Record<string, any>) {
        const keys = Object.keys(o)
        keys.sort()

        const items: string[] = []

        for (let i = 0; i < keys.length; i++) {
            const k = keys[i]
            // handle nested query params
            if (typeof o[k] === 'object') {
                const p = o[k]
                Object.keys(p).forEach((param) => {
                    items.push(`${k}[${param}]=${p[param]}`)
                })
            } else {
                items.push(k + '=' + o[k])
            }
        }
        return items.join('&')
    }
}

export const urlcat = (base: string, opt: Record<string, any>) => {
    return base + '?' + querystring.stringify(opt)
}

function lock(id: string): boolean {
    if (navigationLock[id] === true) {
        return false
    }
    navigationLock[id] = true
    return true
}

function unlock(id: string) {
    if (navigationLock[id] === true) {
        navigationLock[id] = false
        return true
    }
    return false
}
const navigationLock: Record<string, boolean> = {}
type Op = 'navigateTo' | 'switchTab'
function universalNav(
    url: string,
    op: Op,
    timeout = 1500
):
    | false
    | Promise<
          | WechatMiniprogram.NavigateToSuccessCallbackResult
          | WechatMiniprogram.GeneralCallbackResult
      > {
    if (!lock(url)) {
        return false
    }

    return new Promise((success, fail) => {
        function complete() {
            unlock(url)
        }
        setTimeout(complete, timeout)
        if (op === 'navigateTo') {
            wx.navigateTo({ url, complete, success, fail })
        } else if (op === 'switchTab') {
            wx.switchTab({ url, complete, success, fail })
        }
    })
}

export function switchTab(url: string) {
    return universalNav(url, 'switchTab', 500)
}
export function navigateTo(url: string) {
    return universalNav(url, 'navigateTo')
}

const currencySymbol = (currency: string): string => {
    currency = currency.toUpperCase()
    switch (currency) {
        case 'CNY':
            return '¥'
        case 'USD':
            return '$'
        default:
            return '¥'
    }
}

export const formatPriceAmount = (n: number): string => {
    const a = n / 100
    const canOmitFractional = a % 1 === 0
    const b = Number(a).toFixed(2)
    const [intPart, fractionalPart] = b.split('.')

    let ret = ''
    let count = 0
    for (let i = intPart.length - 1; i >= 0; i--) {
        ret = intPart[i] + ret
        if (++count % 3 === 0 && i !== 0) ret = '' + ret // remove comma for consistency
    }
    if (!canOmitFractional) ret = ret + '.' + fractionalPart
    return ret
}
export const formatPrice: (x: {
    currency?: string
    amount: number
}) => string = ({ currency, amount }) => {
    return currencySymbol(currency || 'CNY') + formatPriceAmount(amount)
}

export const parseSelectors = (p: Product): Array<Selectors> => {
    return p.types.map((type, index) => {
        return {
            name: type.name,
            selected: index === 0,
            id: type.id
        }
    })
}

export const createSizeSelectors = (t: Type): Array<Selectors> => {
    return t.allSizes.map((size) => {
        return {
            name: size,
            id: size,
            selected: false,
            enabled: false
        }
    })
}

export const updateSizeSelectors = (
    c: Color,
    sizes: Array<Selectors>
): Array<Selectors> => {
    const availSizes = c.skus.map((sku) => {
        return sku.size
    })
    const updatedSizes = sizes.map((size) => {
        return {
            ...size,
            enabled: availSizes.includes(size.id),
            selected: size.selected && availSizes.includes(size.id)
        }
    })
    return updatedSizes
}
