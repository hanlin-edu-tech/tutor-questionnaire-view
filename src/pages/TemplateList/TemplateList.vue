<template lang="pug">
    #templateList-page
        top-header(:current="current")
        #app.container
            p
            ul.list-group
                li.list-group-item.list-group-item-info
                    .col-md-4.colTitle 問卷名稱
                    .col-md-4.colTitle 問卷作者
                    .col-md-4.colTitle 創建時間
            ul.list-group
                li.list-group-item.list-group-item-action(v-for="template in filteredList")
                    a(:href="'./template.html?id='+template.id")
                        .col-md-4.colTitle {{template.name}}
                        .col-md-4 {{template.author}}
                        .col-md-4 {{template.createDate|moment}}
            p
            nav
                ul.pagination.justify-content-center
                    li.page-item(id="prev" @click="pagination(-1)" :class="currPage === 1? 'disabled':''")
                        .page-link
                            span(aria-hidden='true') &laquo;
                    li.page-item(v-for="i in totalPage" @click="currPage = i")
                        .page-link(:class=" currPage === i? 'btn-info':''") {{i}}
                    li.page-item(id="next" @click="pagination(1)" :class="currPage === totalPage? 'disabled':''")
                        .page-link
                            span(aria-hidden='true') &raquo;
</template>

<script>
import Header from '../../components/Header';
import moment from 'moment'
export default {
    name: 'TemplateListPage',
    components: {
        TopHeader: Header,
    },
    mounted: function () {
            let host = window.location.hostname
            if(host !== "www.tbbt.com.tw"){
                host = "bg.ehanlin.com.tw"
            }
            let contextPath = ''
            fetch(`https://${host}${contextPath}/questionnaire/templates`)
            .then(res=> {
                return res.json();
            })
            .then(data=> {
                this.templates = data
            })
            .catch(err=> {
                console.log(err)
            })
        },
    data: function(){
        return {
            current: 'templateList',
            templates: [],
            currPage: 1,
            countPerPage: 20
        }
    },
    computed: {
        totalPage: function(){
            return Math.ceil(this.templates.length / this.countPerPage)
        },
        pageStart: function(){
            return (this.currPage-1) * this.countPerPage
        },
        filteredList: function(){
            return this.templates.slice(this.pageStart, this.pageStart+this.countPerPage)
        }
    },
    methods: {
        pagination: function(i){
            if(i === -1 && this.currPage !== 1){
                this.currPage -= 1
            }
            if(i === 1 && this.currPage !== this.totalPage){
                this.currPage += 1
            }
        }
    },
    filters: {
            moment: function(value){
                return moment(value).format('YYYY / MM / DD , h:mm a');
            }
    },
  
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
        color: rgb(156, 156, 156);
    }
</style>
