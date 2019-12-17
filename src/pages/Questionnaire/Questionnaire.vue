<template lang="pug">
    #templateList-page
        top-header(:current="current")
        p
        #app.container
            table.table.table-striped.table-bordered
                tr
                    td.table-info(width="150") 樣板名稱
                    td {{questionnaire.name}}
                tr
                    td.table-info 填寫日期
                    td {{ questionnaire.started.$date|moment }}
                tr
                    td.table-info 填寫人
                    td {{ questionnaire.email }}
            table.table.table-striped.table-bordered
                tr
                    td.table-info(width="600") 題目
                    td.table-info 回答
                tr(v-for="(q, i) in questionnaire.questions")
                    td {{i+1+'. '}}{{q.topic}}
                    td(v-if="q.hasOwnProperty('answer')")
                        div(v-for="(ans, index) in q.answer") ({{ index+1 }}) {{ans}}
                    td(v-else) 
                        div 未作答
                        


</template>

<script>
import Header from '../../components/Header';
import moment from 'moment'
export default {
    name: 'QuestionnairePage',
    components: {
        TopHeader: Header,
    },
    mounted: function () {
            const id = window.location.search.split("=")[1]
            const host = window.location.hostname
            let contextPath = ""
            fetch(`https://${host}${contextPath}/questionnaire/questionnaires/${id}`)
            .then(res=> {
                return res.json();
            })
            .then(data=> {
                this.questionnaire = data
            })
            .catch(err=> {
                console.log(err)
            })
        },
    data: function(){
        return {
            questionnaire: {},
            current: 'questionnaireList'
        }
    },
    filters: {
            moment: function(value){
                return moment(value).format('YYYY / MM / DD , h:mm a');
            }
    }
};
</script>

<style scoped>

</style>
