<script>
    import Option from './Option.svelte'
    import { createEventDispatcher } from 'svelte';

    
    export let question = {
        topic : "",
        type : "單選題",
        options: [""],
        required : true,
    }
    export let index
    export let validateQuestion

    const dispatch = createEventDispatcher();
    
    function addOption(){
        question.options.push("")
        question.options = question.options
        console.log('options ',question.options)
    }
    function deleteOption(event){
        console.log('delete option: ', event.detail)
        question.options.splice(event.detail,1)
        question.options = question.options
        console.log(question.options)
        validateQuestion()
    }

    function toggleRequired(){
        question.required === true? false:true
    }

</script>

<style>
    ion-icon {
        font-size:25px;
        color:grey;
        height:38px;
        margin-left:60px;
    }
</style>

<div class="form-row">
	<div class="form-group col-md-6">
		<textarea class="form-control" id="topic" type="text" rows="1" bind:value={question.topic} required on:blur="{validateQuestion}"></textarea>
		<div class="btn btn-secondary btn-sm" style="margin-top:3px;" on:click="{() => dispatch('delete', index)}">刪除</div>
	</div>
	<div class="form-group col-md-2">
		<select class="form-control" id="inputType" bind:value="{question.type}" required on:change="{validateQuestion}">
			<option value="單選題">單選題</option>
			<option value="多選題">多選題</option>
			<option value="問答題">問答題</option>
		</select>
	</div>
    <div class="form-group col-md-3" id="options">
        {#if question.type !== '問答題'}
            {#each question.options as option, i}
                <Option count="{question.options.length}" index="{i}" on:delete="{deleteOption}">
                    <textarea rows="1" class="form-control" id="inputOption" bind:value="{question.options[i]}" required on:blur="{validateQuestion}"/>
                </Option>
            {/each}	
		    <ion-icon name="add-circle-outline" on:click="{addOption}"></ion-icon>	
        {/if}
    </div>
	<div class="form-group col-md-1">
		<div class="form-check form-check-inline" >
			<input class="form-check-input" type="checkbox" bind:checked="{ question.required }" on:change="{toggleRequired}" checked/>是
		</div>
	</div>
</div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          