<script context="module">   
    export async function preload(page){
        const {slug} = page.params
        const res = await this.fetch(`https://www.tbbt.com.tw/questionnaire/questionnaires/${slug}`)
        let questionnaire = await res.json()
        questionnaire['id'] = slug
        console.log(questionnaire)
        return {questionnaire}
    }
</script>

<script>
    export let questionnaire
    import moment from 'moment'
</script>

<svelte:head>
    <title>問卷內容</title>
</svelte:head>

<div class="container" id="app">
    <table class="table table-striped table-bordered">
        <tr>
            <td class="table-info" width="150">樣版名稱</td>
            <td>{ questionnaire.name }</td>
        </tr>
        <tr>
            <td class="table-info">填寫日期</td>
            <td>{ moment(questionnaire.started).format('YYYY / MM / DD , h:mm a') }</td>
        </tr>
        <tr>
            <td class="table-info">填寫者</td>
            <td>{ questionnaire.user }</td>
        </tr>
    </table>
    <table class="table table-striped table-bordered">
        <tr>
            <td class="table-info" width="600">題目</td>
            <td class="table-info">回答</td>
        </tr>
        {#each questionnaire.questions as q, i}
            <tr>
                <td>{ i+1+'. ' }{ q.topic }</td>
                <td>
                    {#if q.hasOwnProperty('answer')}
                        {#each q.answer as ans, i}
                            <div>({ i+1 }) { ans }</div>
                        {/each}
                    {:else}
                            <div>未作答</div>
                    {/if}
                </td>
            </tr>
        {/each}
        </table>
</div>