<template>
	<header>
		<div class="wrapper">
			<nav>
				<RouterLink to="/home">Home</RouterLink>
				<RouterLink to="/about">About</RouterLink>
			</nav>
		</div>
	</header>

	<div class="full-height">

		<div id="nav" style="height: 90px">
			<h1 style="margin: 0">Golden Layout Demo</h1>
			<button @click="onClickInitLayoutMinRow">Init Layout MinRow</button>
			<div style="width: 20px; display: inline-block"></div>
			<button @click="onClickAddGlComponent1">
				Add Simple Component
			</button>
			<button @click="onClickAddGlComponent2">
				Add Widest Component
			</button>
			<!-- <button @click="onClickAddGlComponent3">
				Add Highest Component
			</button> -->

			<select name="pets" id="pet-select" @change="selectedElementToCreate">
				<option value="">--Please choose a component to add--</option>
				<!-- Si on a pas de displayName, fallback sur le nom du composant VueJS, ne pas se tromper en en ayant plusieurs avec le même nom ! -->
				<option  v-for="(componentValue, index) in compsList" :key="index" :value="componentValue.name">{{ 'displayName' in componentValue ? componentValue.displayName : componentValue.name }}</option>

			</select>

			<div style="width: 20px; display: inline-block"></div>
			<button @click="onClickSaveLayout">Save Layout</button>
			<div style="width: 20px; display: inline-block"></div>
			<button @click="onClickLoadLayout">Load Layout</button>
		</div>
		<golden-layout :router="true" ref="GLayoutRoot" :config="prefinedLayouts.miniRow"
			style="width: 100%; height: calc(100% - 162px)">
			<template #Content1="{ abc }">
				<div style="color: white">{{ abc || 111 }}</div>
			</template>
			<template #Content2>
				<div style="width: 100%; color: white; overflow: auto">
					111222333444555666777888999000111222333444555666777888999000111222333444555666777888999000111222333444555666777888999000111222333444555666777888999000111222333444555666777888999000111222333444555666777888999000111222333444555666777888999000111222333444555666777888999000
				</div>
			</template>
			<template #Content3>
				<c3 />
			</template>
			<template #gl-Chatbox="{ username }">
				<gl-chatbox :username="username" />
			</template>

			<template #gl-InputBox="{ text }">
				<gl-InputBox :text="text" />
			</template>




		</golden-layout>
	</div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { prefinedLayouts } from "@/ts/predefined-layouts";
import C3 from "@/components/Content3.vue";
import { GoldenLayout } from './components/index';
import glChatbox from "./components/glChatbox.vue"
import glInputBox from "./components/glInputBox.vue"


const compsList =
	[
		glChatbox,
		glInputBox
	]

const compsListPerName = compsList.reduce((acc, comp) => {
  acc[comp.name] = comp;
  return acc;
}, {});


export default {
	name: "App",
	components: { GoldenLayout, C3, RouterLink, glChatbox, glInputBox },

	watch: {

	},
	beforeMount() {

	},

	mounted() {

	},
	unmounted() {
	},

	data() {
		return {
			prefinedLayouts: prefinedLayouts,
			compsList: compsList,

		};
	},

	computed:
	{


	},

	methods: {
		onClickInitLayoutMinRow() {
			const GLayoutRoot = this.$refs.GLayoutRoot;
			if (!GLayoutRoot) return;
			GLayoutRoot.loadGLLayout(prefinedLayouts.miniRow);
		},

		onClickAddGlComponent1() {
			const GLayoutRoot = this.$refs.GLayoutRoot;
			console.log(GLayoutRoot, GLayoutRoot.addGlComponent, GLayoutRoot)
			if (!GLayoutRoot) return;
			GLayoutRoot.addGlComponent("Content1", "Title 1st", { abc: "lol" });
		},

		onClickAddGlComponent2() {
			const GLayoutRoot = this.$refs.GLayoutRoot;
			if (!GLayoutRoot) return;
			GLayoutRoot.addGlComponent("Content2", "Window chatbox", { abc: "lol" });
		},

		onClickAddGlComponent3() {
			const GLayoutRoot = this.$refs.GLayoutRoot;
			if (!GLayoutRoot) return;
			GLayoutRoot.addGlComponent("Content3", "I'm high");
		},

		onClickSaveLayout() {
			const GLayoutRoot = this.$refs.GLayoutRoot;
			if (!GLayoutRoot) return;
			const config = GLayoutRoot.getLayoutConfig();
			localStorage.setItem("gl_config", JSON.stringify(config));
		},

		onClickLoadLayout() {
			const GLayoutRoot = this.$refs.GLayoutRoot;
			const str = localStorage.getItem("gl_config");
			if (!str) return;
			if (!GLayoutRoot) return;
			const config = JSON.parse(str);
			GLayoutRoot.loadGLLayout(config);
		},
		selectedElementToCreate(event)
		{
			const selectedElemType = event.target.value
			const GLayoutRoot = this.$refs.GLayoutRoot;
			if (!GLayoutRoot) return;

			const elem_value = compsListPerName[selectedElemType]

			let dummy_props = {}
			console.log(elem_value.props)
			for (const [prop_name, __] of  Object.entries(elem_value.props))
			{
				dummy_props[prop_name] = "test"
			}
			console.log(dummy_props)

			GLayoutRoot.addGlComponent(selectedElemType, "Titre bidon - " +elem_value.name , dummy_props);
		}
	}
};


</script>

<style scoped>
header {
	line-height: 1.5;
	max-height: 100vh;
}

.logo {
	display: block;
	margin: 0 auto 2rem;
}

nav {
	width: 100%;
	font-size: 12px;
	text-align: center;
	margin-top: 2rem;
}

nav a.router-link-exact-active {
	color: var(--color-text);
}

nav a.router-link-exact-active:hover {
	background-color: transparent;
}

nav a {
	display: inline-block;
	padding: 0 1rem;
	border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
	border: 0;
}

@media (min-width: 1024px) {
	header {
		place-items: center;
		padding-right: calc(var(--section-gap) / 2);
	}

	.logo {
		margin: 0 2rem 0 0;
	}

	header .wrapper {
		display: flex;
		place-items: flex-start;
		flex-wrap: wrap;
	}

	nav {
		text-align: left;
		margin-left: -1rem;
		font-size: 1rem;

		padding: 1rem 0;
		margin-top: 1rem;
	}
}
</style>
./components