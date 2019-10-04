<script>
	import {onMount} from 'svelte'
	let template
	let dataArr = new Array()
	const questionId = window.location.search.substring(4,window.location.search.length)
	onMount(async () => {
		await fetch(`https://www.tbbt.com.tw/questionnaire/templates/${questionId}`)
		.then(res => {
			return res.json()
		})
		.then(data => {
			template = data
			const count = data.questions.length
			for(let i=0; i<count; i++){
				dataArr.push({
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
		if(!validate()){
			return false
		}
		console.log("unconverted answer: ",dataArr)
		convertAns()
		fetch(`https://www.tbbt.com.tw/questionnaire/questionnaire/create?templateId=${questionId}`,{
			method: "post",
			body: JSON.stringify(dataArr),
			headers: {
				'content-type': 'application/json'
			},
		}).then(res => {
			console.log(res.json())
		})
		
	}
	function validate(){
		let validate = true
		dataArr.forEach(data => {
			if(data.required === true){
				if(data.type === '問答題' && data.answer.trim() === ""){
					console.log('invalid')
					validate = false
					return validate
				}else{
					if(data.answer === ""){
						validate = false
						return validate
					}
				}
			}
		})
		return validate
	}
	function convertAns(){
		dataArr.forEach(data => {
			if(!Array.isArray(data.answer)){
				data.answer = [data.answer]
			}
		})
		console.log('convert answer: ', dataArr)
	}

	function test(){
		console.log(dataArr)
	}
</script>

<style>

</style>
{#if template}
	<div class="container">
		<div class="alert">
			<div class="form-title">{template.name}</div>
			<div class="form-content">{template.description}</div>
		</div>
		<form action="" id="form">
			<div class="form-body">
			{#each template.questions as q, i}
					{#if q.type === '單選題'}
						<div class="form-group">
							<div class="form-topic">{i+1}. {q.topic}</div>
							{#if q.required === true}
								<div class="form-must">*請填寫這個欄位*</div>
							{/if}
							<div class="form-item">
								{#each q.options as o, j}
									<div class="control">
										{#if q.required === true && j === 0}
											<input id="q{i}o{j}" type="radio" name="single{i}" value="{o}" required bind:group="{dataArr[i].answer}" on:click="{test}">
										{:else}
											<input id="q{i}o{j}" type="radio" name="single{i}" value="{o}" bind:group="{dataArr[i].answer}" on:click="{test}">
										{/if}
										<label for="q{i}o{j}">{o}</label>
										<!-- <div class="check"></div> -->
									</div>	
								{/each}
							</div>
						</div>
					{:else if q.type === '多選題'}
						<div class="form-group">
							<div class="form-topic">{i+1}. {q.topic}</div>
							{#if q.required === true}
								<div class="form-must">*請填寫這個欄位*</div>
							{/if}						
							<div class="multiple">
								<div class="multiple-text">複選</div>
							</div>
							<div class="form-item" id="multi{i}">
								{#each q.options as o, j}
									<div class="control">
										<input id="q{i}o{j}" type="checkbox" name="multi{i}" value="{o}" bind:group="{dataArr[i].answer}" on:click="{test}">
										<label for="q{i}o{j}">{o}</label>
										<!-- <div class="check"></div> -->
									</div>
								{/each}
							</div>
						</div>
					{:else}
						<div class="form-group">
							<div class="form-topic">{i+1}. {q.topic}</div>
							{#if q.required === true}
								<div class="form-must">*請填寫這個欄位*</div>
							{/if}
							<div class="form-item">
								{#if q.required === true}
									<textarea placeholder="請填入文字" name="qa{i}" data-subject-answer="500" required bind:value="{dataArr[i].answer}" on:click="{test}"></textarea>
								{:else}
									<textarea placeholder="請填入文字" name="qa{i}" data-subject-answer="500" bind:value="{dataArr[i].answer}" on:click="{test}"></textarea>
								{/if}
								
							</div>
						</div>
					{/if}
				
			{/each}
			</div>
			<div class="row-btn">
				<button class="btn-send" on:click="{submit}">送出</button>
			</div>		
		</form>
	</div>
	<!-- 成功畫面-->
    <div class="modal-success" style="display:none">
        <div class="modal-body">
			<div class="success-banner"></div>
			<div class="success-text">送出成功</div>
			<div class="success-content">我們已收到您的回饋</div>
        </div>
    </div>
{:else}
	loading
{/if}