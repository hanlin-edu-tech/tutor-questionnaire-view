    <script context="module">   
    export async function preload(page){
        const {slug} = page.params
        const res = await this.fetch(`https://www.tbbt.com.tw/questionnaire/templates/${slug}`)
        let template = await res.json()
        template['id'] = slug
        return {template}
    }
</script>

<script>
    export let template
    import moment from 'moment'
    (function test(){
        console.log('template: ',template)
        console.log('id: ', template.id)
        console.log('questions: ', template.questions)
    })()

    function copyLink(){
        const link = document.getElementById('url')
        var range = document.createRange();
        range.selectNodeContents(link);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand('copy')
    }
</script>

<style>
    .badge {
        cursor: pointer;
    }
</style>


<svelte:head>
    <title>樣板內容</title>
</svelte:head>

<div class="container" id="app">
    <table class="table table-striped table-bordered">
        <tr>
            <td class="table-info" width="150">樣版名稱</td>
            <td>{ template.name }</td>
        </tr>
        <tr>
            <td class="table-info" width="150">樣版連結    <span class="badge badge-info" on:click="{copyLink}">copy</span></td>
            <td id="url">{ `https://${window.location.host}/app/survey/index.html?id=${template.id}` }</td>
        </tr>
        <tr>
            <td class="table-info">創建日期</td>
            <td>{ moment(template.createDate.$date).format('YYYY / MM / DD , h:mm a') }</td>
        </tr>
        <tr>
            <td class="table-info">樣版作者</td>
            <td>{ template.author }</td>
        </tr>
        <tr>
            <td class="table-info">前導訊息</td>
            <td>{ template.description }</td>
        </tr>
        <tr>
            <td class="table-info">結束訊息</td>
            <td>{ template.finishMsg }</td>
        </tr>
        <tr>
            <td class="table-info">Call Back URL</td>
            <td>{ template.callBackUrl === ""? "無":template.callBackUrl }</td>
        </tr>
        <tr>
            <td class="table-info">其他</td>
            <td>{ template.extraInfo === ""? "無":template.extraInfo }</td>
        </tr>
    </table>
    <table class="table table-striped table-bordered">
        <tr>
            <td class="table-info">題目</td>
            <td class="table-info" width="80">類型</td>
            <td class="table-info">選項</td>
            <td class="table-info" width="80">必填</td>
        </tr>
        {#each template.questions as q, i}
            <tr>
                <td>{ i+1+'. ' }{ q.topic }</td>
                <td>{ q.type }</td>
                <td>
                    {#if q.hasOwnProperty('options')}
                        {#each q.options as o, i}
                            <div> ({ i+1}) { o }</div>
                        {/each}
                    {:else}
                            <div>無</div>
                    {/if}
                </td>
                <td>{ q.required === true? '是':'否' }</td>
            </tr> 
        {/each}
    </table>
</div>