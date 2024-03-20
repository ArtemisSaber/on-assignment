// index.ts

import { ROUTES } from '../../routes/routes'
import { NavLink } from '../../types/types'
import { navigateTo } from '../../utils/util'

// 获取应用实例
Component({
    data: {
        navLinks: [
            { id: 'editor', route: ROUTES.EDITOR, label: 'Editor' },
            { id: 'article', route: ROUTES.ARTICLE, label: 'Article' }
        ] as Array<NavLink>
    },
    methods: {
        handleTapNavLink(e: WechatMiniprogram.BaseEvent) {
            const { route } = e.currentTarget.dataset
            console.log('route', route)
            navigateTo(route)
        }
    }
})
