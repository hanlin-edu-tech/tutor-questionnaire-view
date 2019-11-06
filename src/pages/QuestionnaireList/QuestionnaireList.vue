<template lang="pug">
    #templateList-page
        top-header(:current="current")
        #app.container
            p
            ul.list-group
                li.list-group-item.list-group-item-info
                    .col-md-6.colTitle 問卷名稱
                    .col-md-3.colTitle 填寫者
                    .col-md-3.colTitle 填寫時間
            ul.list-group
                li.list-group-item.list-group-item-action(v-for="questionnaire in filteredList")
                    a(:href="'./questionnaire.html?id='+questionnaire.id")
                        .col-md-6.colTitle {{questionnaire.name}}
                        .col.md-4.colTitle {{questionnaire.email}}
                        .col-md-3 {{questionnaire.started|moment}}
            p
            nav
                ul.pagination.justify-content-center
                    li.page-item(@click="currPage-=1" :class="currPage === 1? 'disabled':''")
                        .page-link
                            span(aria-hidden='true') &laquo;
                    li.page-item(v-for="i in totalPage" @click="currPage = i")
                        .page-link(:class="i === currPage? 'btn-info':''") {{i}}
                    li.page-item(@click="currPage+=1" :class="currPage === totalPage? 'disabled':''")
                        .page-link
                            span(aria-hidden='true') &raquo;
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
            const host = window.location.hostname
            let contextPath = ''
            if(host === 'www.ehanlin.com.tw'){
                contextPath = "/tutor-questionnaire"
            }
            fetch(`https://${host}${contextPath}/questionnaire/questionnaires`)
            .then(res=> {
                return res.json();
            })
            .then(data=> {
                this.questionnaires = data
            })
            .catch(err=> {
                console.log(err)
            })
        },
    data: function(){
        return {
            current: 'questionnaireList',
            questionnaires: [],
            currPage: 1,
            countPerPage: 20
        }
    },
    computed: {
        totalPage: function(){
            return Math.ceil(this.questionnaires.length / this.countPerPage)
        },
        pageStart: function(){
            return (this.currPage-1) * this.countPerPage
        },
        filteredList: function(){
            return this.questionnaires.slice(this.pageStart, this.pageStart+this.countPerPage)
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
    li {
        display: flex;
    }
    li a {
        margin: 0px; 
        display: flex; 
        width: 100%; 
        height: 100%;
    }
    .pagination.justify-content-center {
        display: flex;
    }
    .disabled {
        display: none;
    }
</style>
