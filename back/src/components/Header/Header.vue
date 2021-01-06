<template lang="pug">
	.header
		nav
			ul(v-if="current !== 'index'")
				li
					a(href='./create.html' :class="current === 'create'? 'selected':''") 新增問卷
				li
					a(href='./templateList.html' :class="current === 'templateList'? 'selected':''") 樣板列表
				li
					a(href='./questionnaireList.html' :class="current === 'questionnaireList'? 'selected':''") 問卷列表
			ul(v-else)
				li
					a.disabled(href='#' tabindex="-1") 新增問卷
				li
					a.disabled(href='#' tabindex="-1") 樣板列表
				li
					a.disabled(href='#' tabindex="-1") 問卷列表
</template>

<script>
export default {
	name: 'Header',
	props: ['current']
};
</script>

<style scoped>
	nav {
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	.selected {
		position: relative;
		display: inline-block;
	}

	.selected::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255,62,0);
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}

	a.disabled {
		color: gray;
		pointer-events: none;
	}
</style>
