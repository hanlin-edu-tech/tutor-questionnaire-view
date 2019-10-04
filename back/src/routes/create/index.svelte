	<script>
	import Question from './Question.svelte'
	import Validation from './Validation.svelte'
	const prefix = '/app/questionnaire'
    let questionCount = 1
    let name = ""
    let description = ""
    let finishMsg = ""
    let callBackUrl = ""
    let extraInfo = ""
    const question = {
        topic: "",
        type: "單選題",
        options: [""],
        required: true
    }
    $: questionArr = [question]

    function addQuestion(){
        console.log('add quesiton: ', questionArr)
        questionCount += 1
        questionArr.push({
        topic: "",
        type: "單選題",
        options: [""],
        required: true
		})
		questionArr = questionArr
	}
	
	function deleteQuestion(event){
		questionArr.splice(event.detail,1)
		questionArr = questionArr
		validateQuestion()
	}

	function submit(){
		const data = {
			name: name,
            description: description,
            questions: questionArr,
            finishMsg: finishMsg,
            callBackUrl: callBackUrl,
            extraInfo: extraInfo,
            enabled: true,
		}
		console.log('data ', JSON.stringify(data))
		fetch('https://www.tbbt.com.tw/questionnaire/templates/create',
					{			
					method:'post',
					headers: {
						'Content-Type':'application/json; charset=utf-8'
					},
					body: JSON.stringify(data),
					credentials: 'include',
					}).then(res => {
						console.log(res)
						// window.location.href = prefix+"/templateList"
					}).catch(err => {
						console.log(err)
					})
	}
	let qValidation = true
	function validation(){
		console.log('validation')
		validateQuestion()
		const form = document.getElementById('form')
		if (form.checkValidity() === false || qValidation === false) {
				event.preventDefault();
				event.stopPropagation();
				form.classList.add('was-validated');
		}else{
			submit()
		}
	}
	let qValidateMsg
	function validateQuestion(){
		qValidation = true
		qValidateMsg = ""
		if(questionArr.length < 1){
			qValidateMsg += '至少要有一題問卷題目 '
			qValidation = false
		}
		questionArr.forEach(q => {
			if(q.type === '問答題'){
				q.options = null
			}
			if(q.topic === null || q.topic.trim() === ""){
				if(qValidateMsg.indexOf('題目不得為空 ') === -1){
					qValidateMsg += '題目不得為空 '
				}
				qValidation = false
			}
			if(q.type === '單選題' && q.options.length <= 1){
				if(qValidateMsg.indexOf('單選題至少要有一個以上的選項 ') === -1){
					qValidateMsg += '單選題至少要有一個以上的選項 '
				}
				qValidation = false
			}
			if(q.type === '多選題' && q.options.length <= 2){
				if(qValidateMsg.indexOf('多選題至少要有二個以上的選項 ') === -1){
					qValidateMsg += '多選題至少要有二個以上的選項 '
				}
				qValidation = false
			}
			if(q.options !== null){
				q.options.forEach(o => {
					if(o.trim() === ""){
						if(qValidateMsg.indexOf('選項不得為空 ') === -1){
							qValidateMsg += '選項不得為空 '
						}
						qValidation = false
					}
				})
			}
		})
	}

</script>


<style>
	#questionField {
		background-color:#e3e3e3; 
		padding:15px; 
		border-radius:10px;
	}
	.invalidQuestion {
		border:1px solid red
	}
</style>

<div class="container" id="app">
	<form class="needs-validation" id="form" novalidate>
		<div class="form-group">
			<label for="name">問卷名稱*</label>
			<input class="form-control" id="name" bind:value="{name}" required="required" />
			<Validation invalidMsg="請輸入問卷名稱"></Validation>
		</div>
		<div class="form-group">
			<label for="description">前導訊息*</label>
			<textarea class="form-control" id="description" bind:value="{description}" rows="3" required="required"></textarea>
			<Validation invalidMsg="請輸入前導訊息"></Validation>
		</div>
		<div class="{qValidation? '':'invalidQuestion'}" id="questionField">
			<div class="form-row">
				<div class="form-group col-md-6">題目</div>
				<div class="form-group col-md-2">類型</div>
				<div class="form-group col-md-3">選項</div>
				<div class="form-group col-md-1">必答</div>
			</div>
            {#each questionArr as question, q}
                <Question question="{questionArr[q]}" index="{q}" on:delete="{deleteQuestion}" {validateQuestion}/>
            {/each}
			<div class="btn btn-primary" style="margin-top:5px;" on:click="{addQuestion}">新增題目</div>
		</div>
		{#if qValidateMsg}
			<div><small class="text-danger">{qValidateMsg}</small></div>
		{/if}
		<p></p>
		<div class="form-group">
			<label for="finishMsg">結束訊息*</label>
			<textarea class="form-control" id="finishMsg" bind:value="{finishMsg}" rows="3" v-model="finishMsg" required="required"></textarea>
			<Validation invalidMsg="請輸入結束訊息"></Validation>
		</div>
		<div class="form-group">
			<label for="callBackUrl">Call back URL</label>
			<input class="form-control" id="callBackUrl" bind:value="{callBackUrl}" />
		</div>
		<div class="form-group">
			<label for="extraInfo">其他</label>
			<textarea class="form-control" id="extraInfo" rows="3" bind:value="{extraInfo}"></textarea>
		</div>
		<button class="btn btn-primary" id="submit" on:click|preventDefault="{validation}">送出 </button>
	</form>
</div>