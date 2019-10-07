<script>
    import { onMount } from "svelte"
    import moment from 'moment'
    const countOfPage = 20;
    let totalPage = 0
    let questionnaires = [];
    onMount(() => {
        getQuestionnaires();
    });
    function getQuestionnaires() {
        fetch("https://www.tbbt.com.tw/questionnaire/questionnaires",{credentials:'include'})
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // console.log(data)
            questionnaires = data
        })
    }
    $: totalPage = Math.ceil(questionnaires.length / countOfPage)
    $: pageStart = (currPage - 1) * countOfPage
    $: filteredList = questionnaires.slice(pageStart, pageStart + countOfPage)
    let currPage = 1
    function setPage(idx) {
    if (idx <= 0 || idx > totalPage) {
        return;
        }
        currPage = idx;
    }
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
    .colTitle {
        font-size: 18px; 
        font-weight:400;
    }
    li a {
        margin: 0px; 
        display: flex; 
        width: 100%; 
        height: 100%;
    }
</style>

<svelte:head>
	<title>樣板列表</title>
</svelte:head>

<div class="container" id="app">
    <ul class="list-group">
        <li class="list-group-item list-group-item-info" style="display:flex">
        <div class="col-md-4 colTitle">
            問卷名稱
        </div>
        <div class="col-md-4 colTitle"></div>
        <div class="col-md-4 colTitle">填寫時間</div>
        </li>
    </ul>
    <ul class="list-group">
        {#each filteredList as questionnaires}
            <li class="list-group-item list-group-item-action" style="display:flex">
                <a rel='prefetch' href="questionnaires/{questionnaires.id}">
                    <div class="col-md-4">{questionnaires.name}</div>
                    <div class="col-md-4"></div>
                    <div class="col-md-4">{moment(questionnaires.started).format('YYYY / MM / DD , h:mm a')}</div>
                </a>
            </li>
        {/each}
    </ul>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
        <li
            class="page-item"
            on:click={() => setPage(currPage - 1)} class:disabled={currPage === 1 ? 'disabled' : ''}>
            <div class="page-link">
            <span aria-hidden="true">&laquo;</span>
            </div>
        </li>
        {#each Array(totalPage) as _, i}
            <li class="page-item" on:click={() => setPage(i + 1)}>
            <div class="page-link">{i + 1}</div>
            </li>
        {/each}
        <li
            class="page-item"
            on:click={() => setPage(currPage + 1)}
            class:disabled={currPage === totalPage ? 'disabled' : ''}>
            <div class="page-link">
            <span aria-hidden="true">&raquo;</span>
            </div>
        </li>
        </ul>
    </nav>
</div>
