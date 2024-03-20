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

export const currencySymbol = (currency: string): string => {
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
