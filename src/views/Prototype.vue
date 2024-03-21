<template>
	<v-form v-model="valid">
		<v-container>
			<v-row>
			<v-col
				cols="12"
				md="4"
			>
				<v-text-field
				v-model="message"
				:counter="20"
				:rules="nameRules"
				label="名前の追加"
				hide-details
				required
				></v-text-field>
			</v-col>
			</v-row>
		</v-container>
	</v-form>
	<v-btn
		color="primary"
		class="ma-2"
		type="submit"
		:disabled="invalid"
		@click="submit"
	>
		追加
	</v-btn>

	<div class="d-flex align-center flex-column">
		<v-card width="400">
		<template v-slot:title>
			{{ message }}
		</template>
	
		<template v-slot:subtitle>
			{{ message }}
		</template>
	
		</v-card>
		
		<v-card width="400">
			<v-card-item>
				<v-card-title>{{ message }}</v-card-title>	
			</v-card-item>
		</v-card>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
	data: () => ({
		message: ""
	})
})
</script>
