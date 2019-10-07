<script>
	import {onMount} from 'svelte'
	import Question from './Question.svelte'
	let template
	let questionnaire = {
		started: null,
		finished: null,
		questions: [],
		template: ''
	}
	let questions = new Array()
	let success
	let callBackUrl
	const questionId = window.location.search.substring(4,window.location.search.length)
	onMount(async () => {
		await fetch(`https://www.tbbt.com.tw/questionnaire/templates/${questionId}`)
		.then(res => {
			return res.json()
		})
		.then(data => {
			questionnaire.started = new Date()
			questionnaire.template = questionId
			callBackUrl = data.callBackUrl
			template = data
			const count = data.questions.length
			for(let i=0; i<count; i++){
				questions.push({
					"topic":data.questions[i].topic,
					"answer":"",
					"required":data.questions[i].required,
					"type":data.questions[i].type,
					"options":data.questions[i].options
				})
			}
		})
	});
	function submit(){
		console.log('submit')
		if(!validate()){
			success = false
			return false
		}
		questionnaire.finished = new Date()
		questionnaire.questions = questions
		convertAns()
		console.log("questionnaire: ",questionnaire)
		fetch(`https://www.tbbt.com.tw/questionnaire/questionnaire/create?templateId=${questionId}`,{
			method: "post",
			body: JSON.stringify(questionnaire),
			headers: {
				'content-type': 'application/json'
			},
			credentials: 'include'
		})
		.then(function(body){
			if(body.ok){success = true}
			return body.text();
		})
		.then(data => {
			console.log(JSON.stringify(data))
			if(callBackUrl !== ""){
				window.location.href = callBackUrl
			}
		})
		
	}
	function validate(){
		let validate = true
		questions.forEach((data, index) => {
			if(data.required === true){
				if(data.type === '問答題' && data.answer.trim() === ""){
					document.getElementById("q"+index).setAttribute("style", "border: 1px solid red")
					validate = false
				}else{
					if(data.answer === ""){
						document.getElementById("q"+index).setAttribute("style", "border: 1px solid red")
						validate = false
					}
				}
			}
		})
		return validate
	}
	function convertAns(){
		questions.forEach(data => {
			if(!Array.isArray(data.answer)){
				data.answer = [data.answer]
			}
		})
	}
	function onSignIn(googleUser){
            var profile = googleUser.getBasicProfile();
            console.log(user.get)
            console.log("ID: " + profile.getId());
            console.log("Email: " + profile.getEmail());
        }
</script>

<style>

</style>
<div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>

{#if template}
	<div class="container">
		<div class="alert">
			<div class="form-title">{template.name}</div>
			<div class="form-content">{template.description}</div>
		</div>
		<form action="" id="form">
			<div class="form-body">
			{#each template.questions as q, i}
				<Question question="{q}" index="{i}" questions="{questions}"/>
			{/each}
			</div>
			<div class="row-btn">
				<div class="btn-send" on:click="{submit}">送出</div>
			</div>		
		</form>
	</div>
	<!-- 成功畫面-->
	{#if success === true}
		<div class="modal-success">
			<div class="modal-body">
				<div class="success-banner"></div>
				<div class="success-text">送出成功</div>
				<div class="success-content">我們已收到您的回饋</div>
			</div>
		</div>
	{/if}
{:else}
	loading
{/if}