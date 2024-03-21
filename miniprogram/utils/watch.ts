const observe = (
    obj: any,
    key: any,
    watchFn: { call: (arg0: any, arg1: any, arg2: any) => void },
    deep: boolean,
    page: any
) => {
    let oldVal = obj[key]
    // 如果监听对象是object类型并且指定deep（深度监听）
    if (oldVal !== null && typeof oldVal === 'object' && deep) {
        // 递归子集，依次执行observe()
        Object.keys(oldVal).forEach((item) => {
            observe(oldVal, item, watchFn, deep, page)
        })
    }
    // 使用Object.defineProperty()劫持数据的写操作，在监听对象改变后执行传入的watchFn
    Object.defineProperty(obj, key, {
        configurable: true,
        enumerable: true,
        set(value) {
            if (value === oldVal) return
            watchFn.call(page, value, oldVal)
            oldVal = value
        },
        get() {
            return oldVal
        }
    })
}

export const setWatcher = (page: { data: any; watch: any }) => {
    // 页面里的data字段
    const data = page.data
    // 页面里的watch字段
    const watch = page.watch
    // 对watch里列举的每一个字段（需要监听的字段）执行observe()
    Object.keys(watch).forEach((key) => {
        let targetData = data
        const targetKey = key
        // 支持deep深度监听，使用deep时需要配合handler使用，否则直接编写函数
        const watchFn = watch[key].handler || watch[key]
        const deep = watch[key].deep
        observe(targetData, targetKey, watchFn, deep, page)
    })
}
