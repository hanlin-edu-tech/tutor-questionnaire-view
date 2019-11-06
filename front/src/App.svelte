<script>
	import {onMount} from 'svelte'
	import Question from './Question.svelte'
	let template
	let questionnaire = {
		started: null,
		finished: null,
		questions: [],
		template: '',
		finishMsg: '',
		callBackUrl: ''
	}
	let questions = new Array()
	let success
	let callBackUrl
	const questionId = window.location.search.substring(4,window.location.search.length)
	onMount(async () => {
		if(window.location.protocol === "http:"){
			const path = window.location.href.split(":")[1]		
			window.location.href = `https:${path}`
		}
		const host = window.location.hostname
        let contextPath = ''
        if(host === 'www.ehanlin.com.tw'){
            contextPath = "/tutor-questionnaire"
        }
		await fetch(`https://${host}${contextPath}/questionnaire/templates/${questionId}`)
		.then(res => {
			return res.json()
		})
		.then(data => {
			questionnaire.started = new Date()
			questionnaire.template = questionId
			questionnaire.callBackUrl = data.callBackUrl
			questionnaire.finishMsg = data.finishMsg
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
		// console.log('questions: ', questionnaire.questions)
		if(!validate()){
			success = false
			return false
		}
		questionnaire.finished = new Date()
		questionnaire.questions = questions	
		convertAns()
		const host = window.location.hostname
        let contextPath = ''
        if(host === 'www.ehanlin.com.tw'){
            contextPath = "/tutor-questionnaire"
        }
		fetch(`https://${host}${contextPath}/questionnaire/questionnaire/create?templateId=${questionId}`,{
			method: "post",
			body: JSON.stringify(questionnaire),
			headers: {
				'content-type': 'application/json'
			},
			credentials: 'include'
		})
		.then(function(body){
			if(body.ok){
				success = true
				if(questionnaire.callBackUrl.trim() !== ""){
					setTimeout(()=>{window.location.href = questionnaire.callBackUrl}, 700)
					
				}
			}
		
		})
		
	}
	function validate(){
		let validate = true
		questions.forEach((data, index) => {
			document.getElementById("q"+index).classList.remove("invalid")
			document.getElementById("must"+index).classList.add("hide")
			if(data.required === true){
				if(data.type === '問答題' && data.answer.trim() === ""){					
					warning(index)
					validate = false
				}else if(data.type === '多選題' && data.answer.length === 0 ){
					warning(index)
					validate = false
				}else{
					if(data.answer === ""){
						warning(index)
						validate = false
					}
				}
			}
		})
		return validate
	}

	function warning(index){
		document.getElementById("q"+index).classList.add("invalid")
		document.getElementById("must"+index).classList.remove("hide")
	}

	function convertAns(){
		questions.forEach(data => {
			if(!Array.isArray(data.answer)){
				data.answer = [data.answer]
			}
		})
	}
</script>
<style>
	.container {
		width: 980px;
		margin: 0 auto;
		background-color: rgba(255, 255, 255, 0.685);
	}
	#main {
		display: flex;
	}
</style>
<svelte:head>
	{#if template}
		<title>{template.name}</title>
	{:else}
		<title>問卷</title>
	{/if}
</svelte:head>

<div id="main">
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
				<div class="row-btn" style="margin-bottom:10px;">
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
					{#if template.finishMsg}
						<div class="success-content">{template.finishMsg}</div>
					{/if}
				</div>
			</div>
		{/if}
	{:else}
		loading		
	{/if}
</div>