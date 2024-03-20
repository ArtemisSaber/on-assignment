// index.ts

import { ROUTES } from '../../routes/routes'

// 获取应用实例
Component({
    data: {
        navLinks: [
            { id: 'editor', route: ROUTES.EDITOR, label: 'Editor' },
            { id: 'article', route: ROUTES.ARTICLE, label: 'Article' }
        ]
    },
    methods: {}
})
