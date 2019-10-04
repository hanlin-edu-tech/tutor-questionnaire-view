<script>
    export let dataArr
    export let question
    export let index
    // import { createEventDispatcher } from 'svelte'
    // const dispatch = createEventDispatcher()
</script>

{#if question.type === '單選題'}
	<div class="form-group">
		<div class="form-topic">{index+1}. {question.topic}</div>
		{#if question.required === true}
			<div class="form-must">*請填寫這個欄位*</div>
		{/if}
		<div class="form-item">
			{#each question.options as o, j}
				<div class="control">
                    <input id="q{index}o{j}" type="radio" name="single{index}" value="{o}" bind:group="{dataArr[index].answer}">
					<label for="q{index}o{j}">{o}</label>
				</div>	
			{/each}
		</div>
	</div>
{:else if question.type === '多選題'}
	<div class="form-group">
		<div class="form-topic">{index+1}. {question.topic}</div>
		{#if question.required === true}
			<div class="form-must">*請填寫這個欄位*</div>
		{/if}						
		<div class="multiple">
			<div class="multiple-text">複選</div>
		</div>
		<div class="form-item" id="multi{index}">
			{#each question.options as o, j}
				<div class="control">
                    <input id="q{index}o{j}" type="checkbox" name="multi{index}" value="{o}" bind:group="{dataArr[index].answer}">
					<label for="q{index}o{j}">{o}</label>
				</div>
			{/each}
		</div>
	</div>
{:else}
	<div class="form-group">
		<div class="form-topic">{index+1}. {question.topic}</div>
		{#if question.required === true}
			<div class="form-must">*請填寫這個欄位*</div>
		{/if}
		<div class="form-item">			
            <textarea placeholder="請填入文字" name="qa{index}" data-subject-answer="500" bind:value="{dataArr[index].answer}"></textarea>
		</div>
	</div>
{/if}
				