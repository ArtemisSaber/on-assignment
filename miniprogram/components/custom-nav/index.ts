// https://github.com/wechat-miniprogram/weui-miniprogram/blob/master/src/navigation-bar/navigation-bar.ts
// .weui-navigation-bar{position:relative;}
// .weui-navigation-bar__inner{position:absolute;}

import { ROUTES } from '../../routes/routes'
import { navigateTo } from '../../utils/util'

// https://github.com/Tencent/weui-wxss/blob/78ed9949f4b4c17132faae0a223179b86591fac1/src/style/base/patch/weui-navigation-bar.less
const FADE_START = 150
const FADE_END = 250
const RGB_BLACK = '0,0,0'
const RGB_WHITE = '255,255,255'

const INITIAL_ICON_BG_OPACITY = 0.8

const NavBarIcon = {
    Back: {
        key: 'back',
        icon: 'icon-back'
    },
    Home: {
        key: 'home',
        icon: 'icon-home'
    }
}

Component({
    options: { styleIsolation: 'isolated' },
    properties: {
        theme: { type: String, value: 'light' },
        placehold: { type: String, value: 'none' },
        color: { type: String, value: 'inherit' },
        showArrowHint: { type: Boolean, value: false },
        initialBgOpacity: { type: Number, value: 1 },
        initBgRgb: { type: String, value: RGB_WHITE },
        bgRgb: { type: String, value: '0, 0, 0' },
        initialTitleOpacity: { type: Number, value: 1 },
        // depth of page to go back
        goBackDelta: {
            type: Number,
            value: 1,
            observer(goBackDelta) {
                this.setData({
                    goBackDelta
                })
            }
        }
    },
    data: {
        titleOpacity: -1,
        showArrow: false,
        frontColor: 'black', // 'black' | 'white'
        iconOpacity: INITIAL_ICON_BG_OPACITY,
        buttons: [] as Array<any>,
        bgOpacity: 1
    },
    lifetimes: {
        async attached() {
            // https://developers.weixin.qq.com/miniprogram/dev/api/ui/menu/wx.getMenuButtonBoundingClientRect.html
            const isSupport = !!wx.getMenuButtonBoundingClientRect
            const rect = wx.getMenuButtonBoundingClientRect
                ? wx.getMenuButtonBoundingClientRect()
                : null
            const colorData = this.updateColorTheme(this.data.theme)

            const pages = getCurrentPages()
            // eslint-disable-next-line no-console
            // console.log(pages);
            // let showArrow: boolean;
            let buttons = [] as Array<any>
            if (pages.length > 1) {
                buttons = [NavBarIcon.Back, NavBarIcon.Home]
            } else {
                buttons = [NavBarIcon.Home]
            }
            wx.getSystemInfoAsync({
                success: (res) => {
                    const ios = !!(res.system.toLowerCase().search('ios') + 1)
                    this.setData({
                        ios,
                        statusBarHeight: res.statusBarHeight,
                        innerWidth: isSupport ? `width:${rect?.left}px` : '',
                        innerPaddingRight: isSupport
                            ? `padding-right:${
                                  res.windowWidth -
                                  (rect?.left ? rect?.left : 0)
                              }px`
                            : '',
                        leftWidth: isSupport
                            ? `width:${
                                  res.windowWidth -
                                  (rect?.left ? rect?.left : 0)
                              }px`
                            : '',
                        buttons,
                        ...colorData
                    })
                }
            })
        }
        // ready() {},
    },
    methods: {
        handleTapIconButton(e: WechatMiniprogram.BaseEvent) {
            const { key } = e.currentTarget.dataset
            if (key === NavBarIcon.Back.key) {
                // wx.navigateBack({ delta: data.delta });
                console.log('delta', this.data.goBackDelta)
                wx.navigateBack({
                    delta: this.data.goBackDelta
                })
            } else if (key === NavBarIcon.Home.key) {
                navigateTo(ROUTES.HOME)
            }
            this.triggerEvent('topicon', { key })
        },
        updateButtons(buttons: Array<any>) {
            this.setData({ buttons })
        },

        updateColorTheme(theme: string) {
            const ret = {
                titleColor: '#111',
                iconColor: 'dark',
                bgRgb: RGB_WHITE
            }
            if (theme === 'light') {
                setNavigationBarColor('light')
                ret.bgRgb = RGB_WHITE
            } else if (theme === 'dark') {
                setNavigationBarColor('dark')
                return {
                    ...ret,
                    titleColor: '#fff',
                    bgRgb: RGB_BLACK,
                    iconColor: 'light'
                }
            }

            if (this.data.initBgRgb !== RGB_BLACK) {
                ret.bgRgb = this.data.initBgRgb
            }

            return ret
        },

        fadeInOut(
            scrollTop: number,
            fadeStart = FADE_START,
            fadeEnd = FADE_END
        ) {
            const { bgOpacity, titleOpacity, iconOpacity, initBgRgb } =
                this.data
            if (scrollTop > fadeEnd) {
                if (bgOpacity === 1 && titleOpacity === 1 && iconOpacity === 0)
                    return
                this.setData({
                    bgOpacity: 1,
                    titleOpacity: 1,
                    iconOpacity: 0,
                    titleColor: '#111',
                    bgRgb: initBgRgb
                })
            } else if (scrollTop > fadeStart) {
                const distance = fadeEnd - fadeStart
                // eslint-disable-next-line no-shadow
                const bgOpacity = (1 / distance) * (scrollTop - fadeStart)
                // eslint-disable-next-line no-shadow
                const titleOpacity = bgOpacity
                this.setData({
                    bgOpacity,
                    titleOpacity,
                    iconOpacity: (1 - bgOpacity) * INITIAL_ICON_BG_OPACITY,
                    // iconOpacity: 0,
                    titleColor: '#111',
                    bgColorRgb: '255,255,255'
                })
            } else {
                if (
                    bgOpacity === 0 &&
                    titleOpacity === 0 &&
                    iconOpacity === INITIAL_ICON_BG_OPACITY
                )
                    return
                this.setData({
                    bgOpacity: 0,
                    titleOpacity: 0,
                    iconOpacity: INITIAL_ICON_BG_OPACITY
                })
            }
        }
    }
})

const themes = {
    // note
    // we are drawing the background ourselves
    // backgroundColor here actually does not have effect on the UI
    // the wx.setNavigationBarColor API needs it to be presented in the API call
    dark: {
        // white front color
        frontColor: '#ffffff',
        backgroundColor: '#000000'
    },
    light: {
        // black front color
        frontColor: '#000000',
        backgroundColor: '#ffffff'
    }
}

export function setNavigationBarColor(key: 'light' | 'dark') {
    wx.setNavigationBarColor(themes[key])
}
