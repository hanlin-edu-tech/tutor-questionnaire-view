<template lang="pug">
  #create-page
    top-header(:current="current")
    p
    .container#app
        form#form
            .form-group
                label(for='name') 問卷名稱
                input#name.form-control(v-model="name" required="required")
                .invalid-feedback 請輸入問卷名稱
            .form-group
                label(for='description') 前導訊息
                textarea#description.form-control(rows="3" v-model="description" required="required")
                .invalid-feedback 請輸入前導訊息
            #questionField(:class="qValidation? '':'invalidQuestion'")
                .form-row
                    .form-group.col-md-6 題目
                    .form-group.col-md-2 類型
                    .form-group.col-md-3 選項
                    .form-group.col-md-1 必填
                question-component(v-for="(question, index) in questionArr" :key="index" :question="questionArr[index]" :index="index" :count="questionArr.length" @remove="removeQuestion(index)")
                div.btn.btn-primary(@click="addQuestion") 新增題目
            div
              small.text-danger {{qValidateMsg}}
            p
            .form-group
                label(for='finishMsg') 結束訊息
                textarea#finishMsg.form-control(rows="3" v-model="finishMsg" required=true)
                .invalid-feedback 請輸入結束訊息
            .form-group
                label(for='callBackUrl') Call back URL
                input#callBackUrl.form-control(v-model="callBackUrl")
            .form-group
                label(for='extraInfo') 其他
                textarea#extraInfo.form-control(rows="3" v-model="extraInfo")
            button#submit.btn.btn-primary(@click.prevent="validation") 送出
    .modal-success(v-if="success === true")
      .modal-body
        .success-banner
        .success-text 送出成功
</template>

<script>
import Header from '../../components/Header';
import Question from '../../components/Question'

export default {
  name: 'CreatePage',
  components: {
    TopHeader: Header,
    QuestionComponent: Question,
  },
  data: function() {
    return {
      current: 'create',
      success: false,
      questionCount: 1,
      name: '',
      description: '',
      finishMsg: '',
      callBackUrl: '',
      extraInfo: '',
      questionArr: [{
        topic: '',
        type: '單選題',
        options: [''],
        required: true,
      }],
      qValidateMsg: "",
      qValidation: true,
      success: false,
    }
  },
  methods: {
    addQuestion: function () {
        this.questionArr.push({
        topic: "",
        type: "單選題",
        options: [""],
        required: true
		})
    },
    removeQuestion: function (index) {
      this.questionArr.splice(index, 1)
    },
    submit: function () {
      const data = {
          name: this.name,
          description: this.description,
          questions: this.questionArr,
          finishMsg: this.finishMsg, 
          callBackUrl: this.callBackUrl,
          extraInfo: this.extraInfo,
          enabled: true,
      } 
      const host = window.location.hostname
      let contextPath = ''
      if(host === 'www.ehanlin.com.tw'){
          contextPath = "/tutor-questionnaire"
      }
      fetch(`https://${host}${contextPath}/questionnaire/templates/create`,
					{			
					method:'post',
					headers: {
						'Content-Type':'application/json; charset=utf-8'
					},
					body: JSON.stringify(data),
					credentials: 'include',
					}).then(res => {
            console.log(res)
            if(res.type === 'cors' && res.status === 403){
                alert('請先登入')
                window.location.href="./index.html"
            }
            if(res.status === 200){
              this.success = true
              window.setTimeout(()=>{window.location.href="./templateList.html"},500)
            }
					}).catch(err => {
						console.log(err)
					})
    },
    validation: function(){
      this.validateQuestion()
      const form = document.getElementById('form')
      if (form.checkValidity() === false || this.qValidation === false) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add('was-validated');
      }else{
        this.submit()
      }
    },
    validateQuestion: function(){
      this.qValidation = true
      this.qValidateMsg = ""
      if(this.questionArr.length < 1){
        this.qValidateMsg += '至少要有一題問卷題目 '
        this.qValidation = false
      }
      this.questionArr.forEach(q => {
        if(q.type === '問答題'){
          q.options = null
        }
        if(q.topic === null || q.topic.trim() === ""){
          if(this.qValidateMsg.indexOf('題目不得為空 ') === -1){
            this.qValidateMsg += '題目不得為空 '
          }
          this.qValidation = false
        }
        if(q.type === '單選題' && q.options.length <= 1){
          if(this.qValidateMsg.indexOf('單選題至少要有一個以上的選項 ') === -1){
            this.qValidateMsg += '單選題至少要有一個以上的選項 '
          }
          this.qValidation = false
        }
        if(q.type === '多選題' && q.options.length <= 2){
          if(this.qValidateMsg.indexOf('多選題至少要有二個以上的選項 ') === -1){
            this.qValidateMsg += '多選題至少要有二個以上的選項 '
          }
          this.qValidation = false
        }
        if(q.options !== null){
          q.options.forEach(o => {
            if(o.trim() === ""){
              if(this.qValidateMsg.indexOf('選項不得為空 ') === -1){
                this.qValidateMsg += '選項不得為空 '
              }
              this.qValidation = false
            }
          })
        }
        if(document.getElementsByClassName("duplicateOption").length !== 0){
          this.qValidateMsg += "選項重複"
          this.qValidation = false
        }
      })
    },
  },
};
</script>

<style scoped>
  #questionField {
		background-color:#e3e3e3; 
		padding:15px; 
		border-radius:10px;
  }
	.invalidQuestion {
		border:1px solid red
	}
	.modal-success {
	z-index: 1000;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: #F5F5F5;
	-webkit-animation: show 1s forwards;
			animation: show 1s forwards; }
	.modal-success .success-banner {
		width: 100%;
		height: 240px;
		background-size: cover;
		background-position: center center; }
	.modal-success .success-text {
		text-align: center;
		padding: 30px 0px;
		color: #0D6CBE;
		font-size: 22px;
		font-weight: 500; }
	.modal-success .success-content {
		text-align: center;
    font-size: 14px; }
  ion-icon {
        font-size:25px;
        color:grey;
        height:38px;
        /* margin-left:60px; */
    }
</style>
