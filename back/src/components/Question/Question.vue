<template lang="pug">
    .form-row
        .form-group.col-md-6
            textarea#topic.form-control(type='text' v-model="question.topic" rows="1" :placeholder="index+1+'.'" required=true)
            .btn.btn-secondary.btn-sm(@click="removeQuestion" style="margin-top:3px" v-if="count !== 1") 刪除
        .form-group.col-md-2
            select#inputType.form-control(v-model="question.type")
                option(value="單選題") 單選題
                option(value="多選題") 多選題
                option(value="問答題") 問答題
        .form-group.col-md-3(v-if="question.type !== '問答題'")
            div(v-for=" (option, i) in question.options")
                div(style="display:flex")
                    input.form-control(:id="'inputOption'+i" type='text' v-model="question.options[i]" @blur="checkOption(question.options, option, i)")
                    ion-icon(name="trash" v-if=" question.options.length === 1" )                 
                    ion-icon(name="trash" @click="question.options.splice(i,1)" v-if=" question.options.length !== 1" )                
                ion-icon(name="add-circle-outline" @click="question.options.push('')" v-if=" i+1 === question.options.length")
        .form-group.col-md-1
            .form-check.form-check-inline
                input.form-check-input(type='checkbox', value="true" v-model="question.required") 
                | 是
</template>

<script>
export default {
    name: 'Question',
    props: ['question', 'index', 'count'],
    methods: {
        removeQuestion: function(){
            this.$emit('remove')
        },
        checkOption: function(optionArr, option, i){
        document.getElementById("inputOption"+i).classList.remove("duplicateOption")
        console.log(optionArr.indexOf(option))
        if(optionArr.indexOf(option) !== i){
            console.log('選項重複')
            document.getElementById("inputOption"+i).classList.add("duplicateOption")
        }
    }
    }
}
</script>

<style scoped>
    ion-icon {
        font-size: 25px;
        color:grey;
        height:38px;
    }
    ion-icon[name="add-circle-outline"] {
        display: block;
        margin: 0 40%;
    }
    .form-group.col-md-1 > .form-check-inline {
    margin-left: 25px;
    }
    .duplicateOption {
        border: 2px solid red !important;
    }
</style>