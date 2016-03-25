// pagination component create by xiaofeixiang at 2016-01-26 14:50:08
(function (Vue) {

    Vue.component('vTable', {
        props: ['filters', 'url'],
        created: function () {
            this.$options.template = this.tpl || '#table-tpl'
            this.queryChange()
        },
        data: function () {
            return {
                items: [],
                pageNo: 1,
                pageSize: 10,
                totalResult: 0,
                orderBy: null,
                isDesc: false,
                loading: false,
            }
        },
        //template: this.tpl,
        replace: true,
        inherit: false,
        computed: {

        },
        methods: {
            queryChange: function () {
                this.pageChange(1)
            },
            pageChange: function (num) {
                if (this.loading) return
                this.loading = true
                this.pageNo = num
                this.$http.get(this.url, {
                	pageNo : this.pageNo,
                    limit: this.pageSize,
                    offset: (this.pageNo - 1) * this.pageSize
                }).then(function (response) {
                    this.items = response.data.list
                    this.totalResult = response.data.totalRow
                    this.loading = false
                })
            },
            orderChange: function (colName) {
                if (this.orderBy == colName) {
                    this.isDesc = !this.isDesc
                }
                else {
                    this.orderBy = colName
                    this.isDesc = false
                }
                this.queryChange()
            },
        },
    })

})(Vue)