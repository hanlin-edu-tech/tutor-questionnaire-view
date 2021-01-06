<template lang="pug">
    #templateList-page
        top-header(:current="current")
        p
        #app.container
            table.table.table-striped.table-bordered
                tr
                    td.table-info(width='150') 樣板名稱
                    td {{ template.name }}
                tr
                    td.table-info(width='150') 樣板連結
                        span.badge.badge-info(@click='copyLink') copy
                    td#url {{link}}
                tr
                    td.table-info 創建日期
                    td {{ template.createDate.$date|moment }}
                tr
                    td.table-info 樣板作者
                    td {{ template.author }}
                tr                       
                    td.table-info 前導訊息
                    td {{ template.description }}
                tr
                    td.table-info 結束訊息
                    td {{ template.finishMsg }}
                tr
                    td.table-info Call Back URL
                    td {{ template.callBackUrl === ''? '無':template.callBackUrl}}
                tr
                    td.table-info 其他
                    td {{ template.extraInfo === ''? '無':template.extraInfo}}
            table.table.table-striped.table-bordered
                tr
                    td.table-info 題目
                    td.table-info(width='80') 類型
                    td.table-info 選項
                    td.table-info(width='80') 必填
                tr(v-for="(q,index) in template.questions")
                    td {{index+1+'. '}} {{q.topic}}
                    td {{q.type}}
                    td(v-if="q.hasOwnProperty('options')")
                        div(v-for="(o,i) in q.options") ({{i+1}}) {{o}}
                    td(v-else) 
                        div 無
                    td {{ q.required === true? '是':'否'}}


                        


</template>

<script>
import Header from '../../components/Header';
import moment from 'moment'
export default {
    name: 'TemplatePage',
    components: {
        TopHeader: Header,
    },
    mounted: function () {
            const id = window.location.search.split("=")[1]
            this.id = id
            const host = window.location.hostname
            let contextPath = ''
            fetch(`https://${host}${contextPath}/questionnaire/templates/${id}`)
            .then(res=> {
                return res.json();
            })
            .then(data=> {
                this.template = data
            })
            .catch(err=> {
                console.log(err)
            })
        },
    data: function(){
        return {
            template: {},
            id: "",
            current: 'templateList'
        }
    },
    filters: {
            moment: function(value){
                return moment(value).format('YYYY / MM / DD , h:mm a');
            }
    },
    computed: {
        link: function(){
            return `https://${window.location.host}/app/survey/index.html?id=${this.id}`
        }
    },
    methods: {
        copyLink: function(){
            const link = document.getElementById('url')
            var range = document.createRange();
            range.selectNodeContents(link);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            document.execCommand('copy')
        }
    }
};
</script>

<style scoped>
    .badge {
            cursor: pointer;
        }
</style>
