class Vue {
    constructor( options ) {
        this.options = options;
        // 监听的对象
        this.watchEvent = {};
        if (typeof options.beforeCreate === 'function') {
            options.beforeCreate.bind(this)();
        }
        this.$data = options.data;
        this.proxyData();
        this.observe();
        if (typeof options.created === 'function') {
            options.created.bind(this)();
        }
        if (typeof options.beforeMount === 'function') {
            options.beforeMount.bind(this)();
        }
        if (options.el) {
            this.$el = document.querySelector(options.el);
        }
        this.compile(this.$el);
        // 更新实图
        if (typeof options.mounted === 'function') {
            options.mounted.bind(this)();
        }
    }
    // 编译
    compile(node) {
        node.childNodes.forEach((item, index) => {
            const nodeType = item.nodeType;
            if (nodeType == 1) {
                if (item.hasAttribute('@click')) {
                    item.addEventListener('click', (event) => {
                        let eventName = item.getAttribute('@click');
                        const eventFun = this.options.methods[eventName].bind(this);
                        eventFun(event);
                    })
                }
                if (item.childNodes.length) {
                    this.compile(item);
                }
            }
            if (nodeType == 3) {
                let regText = /\{\{(.*?)\}\}/g;
                item.textContent = item.textContent.replace(regText , (oldVal, vmKey) => {
                    vmKey = vmKey.trim();
                    let watcher = new Watch(this, vmKey, item, 'textContent')
                    if (this.hasOwnProperty(vmKey)) {
                        if (!this.watchEvent[vmKey]) {
                            this.watchEvent[vmKey] = [];
                        }
                        this.watchEvent[vmKey].push(watcher);
                    }
                    return this.$data[vmKey];
                });
            }
        })
    }
    // 劫持
    proxyData() {
        for (const key in this.$data) {
            Object.defineProperty(this, key, {
                get() {
                    return this.$data[key]
                },
                set(value) {
                    this.$data[key] = value;
                }
            })
        }
    }
    // 触发 data 中数据发生变化后来执行watch 中的 update
    observe() {
        for (const key in this.$data) {
            let value = this.$data[key];
            let that = this;
            Object.defineProperty(this.$data, key, {
                get() {
                    return value;
                },
                set(val) {
                    value = val
                    if (that.watchEvent[key]) {
                        that.watchEvent[key].forEach((item, index) => {
                            item.update();
                        })
                    }
                }
            })
        }
    }
}

// 创建更新的方法
class Watch {
    constructor(vm, key, node, context) {
        this.vm = vm;
        this.key = key;
        this.node = node;
        this.context = context;
    }
    update() {
        this.node[this.context] = this.vm[this.key];
    }
}