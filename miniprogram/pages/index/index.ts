// index.ts

import { ROUTES } from '../../routes/routes'
import { NavLink } from '../../types/types'
import { navigateTo, urlcat } from '../../utils/util'

// 获取应用实例
Component({
    data: {
        navLinks: [
            { id: 'products', route: ROUTES.PLP, label: 'Products' },
            {
                id: 'article',
                route: ROUTES.ARTICLE,
                label: 'Article',
                params: { articleId: 'ART-1' }
            }
        ] as Array<NavLink>
    },
    methods: {
        handleTapNavLink(e: WechatMiniprogram.BaseEvent) {
            const { id } = e.currentTarget.dataset
            const links = this.data.navLinks
            const targetLink = links.find((e) => e.id === id)
            console.log('route', targetLink?.route)
            let url = targetLink?.route as string
            if (targetLink?.params) {
                url = urlcat(url, targetLink.params)
            }
            navigateTo(url)
        }
    }
})
